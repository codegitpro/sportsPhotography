Component({
    properties: {
        tableName: {
            type: String,
            value: '',
        },
        playlist: {
            type: Array,
            value: [],
            observer(newVal) {
                //   this.setData({ list: newVal });
                if (newVal.length > 0 && this.data.musicIndex === -1) {
                    this.setData({
                        musicIndex: 0
                    });
                    this.playMusic(0);
                }
            }
        }
    },
    data: {
        state: 'paused',
        playMode: 'sequential', // 播放模式：sequential（顺序播放），shuffle（随机播放） single  （单曲循环） 
        baifenbi: 0,
        allTime: '00:00',
        nowTime: '00:00',
        playTime: 0,
        musicIndex: -1,
        list: [],
        playType: false,
        playIndex: 2, //1单曲 //2列表 //3随机
        listShow: false,
        bottomHeight: 0,
        baseUrl: wx.getStorageSync('baseUrl') + "/",
    },
    ready() {
        let that = this;
        this.setData({
            innerAudioContext: wx.createInnerAudioContext()
        })
        wx.getSystemInfo({
            success(res) {
                that.bottomHeight = res.windowBottom
            }
        })
    },
    lifetimes: {

        attached() {
            this.innerAudioContext = wx.createInnerAudioContext();
            this.initAudioListeners();
            wx.getSystemInfo({
                success: res => this.setData({
                    bottomHeight: res.windowBottom
                })
            });
        },
        detached() {
            this.innerAudioContext.destroy();
        }
    },
    methods: {
        listClick() {
            this.setData({
                listShow: true,

            })

        },
        // 点击随机播放
        shuffle() {
            this.setData({
                playMode: 'shuffle',
                randomPlayMusic: true,
            });
            wx.showToast({
                title: '随机播放',
                icon: 'none'
            })
            this.playRandomMusic()
        },
        // 播放音乐
        play() {
            this.innerAudioContext.play();
            this.setData({ state: 'running' });
        },
        // 设置当前播放的歌曲
        playMusic(index) {
            const music = this.data.list[index];
            // 如果当前状态不是running（即不是正在播放），则播放音乐
            if (music) {
                this.innerAudioContext.src = this.data.baseUrl + music.src;
                this.setData({
                    musicIndex: index
                });
            }
        },
        next() {
            var index = this.data.musicIndex >= this.data.list.length - 1 ? 0 : this.data.musicIndex + 1
            this.playMusic(index)
            if (this.data.state === 'running') {
                this.play()
            }
        },
        initAudioListeners() {
            const ictx = this.innerAudioContext;
            // 正确的时间更新监听
            ictx.onTimeUpdate(() => {
                // 添加数据有效性校验
                const current = this.validateTime(ictx.currentTime);
                const duration = this.validateTime(ictx.duration);
                this.setData({
                    // nowTime: current,
                    // allTime: duration,
                    baifenbi: duration > 0 ? (current / duration * 100) : 0
                });
            });

            // 新增音频元数据加载完成监听
            ictx.onCanplay(() => {
                const validDuration = this.validateTime(ictx.duration);
            });
        },
        // 新增时间验证方法
        validateTime(seconds) {
            // 过滤异常值：正常歌曲时长不超过24小时（86400秒）
            if (isNaN(seconds) || seconds < 0 || seconds > 86400) {
                return 0;
            }
            return Math.floor(seconds);
        },
        close() {
            this.setData({
                listShow: false
            })
        },
        stopClick() {
            this.innerAudioContext.pause();
        },
        // 优化后的时间格式化方法
        getTimeStr(seconds, toMilliseconds = false) {
            const validSeconds = this.validateTime(seconds);
            const displaySeconds = toMilliseconds ? validSeconds * 1000 : validSeconds;
            const mins = Math.floor(displaySeconds / 60);
            const secs = displaySeconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },

        sliderChange(e) {

        },
        changeMusic(item) {
            for (let x in this.data.list) {
                if (this.data.list[x].id == item.id) {
                    this.setData({
                        musicIndex: Number(x)
                    })
                    return false
                }
            }
            return true
        },
        playAllClick(item, list) {
            console.log('list33', list);
            this.setData({
                list: list
            })
            this.playClick(item)
        },
        // 格式化时间
        formatTime(time) {
            const minute = Math.floor(time / 60) % 60;
            const second = Math.floor(time % 60);
            return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
        },
        // 点击顺序播放
        sequentialPlayback() {
            this.setData({
                playMode: 'sequential',
                randomPlayMusic: false,
            });
            wx.showToast({
                title: '顺序播放',
                icon: 'none'
            })
        },
        playClick(item) {
            this.innerAudioContext.onPlay(() => {
                console.log('[调试] 音频开始播放');
                this.setData({
                    playType: true
                });
            });

            this.innerAudioContext.onError(res => {
                console.error('[错误] 音频播放失败:', res);
                wx.showToast({
                    title: '音频加载失败',
                    icon: 'none'
                });
                this.setData({
                    allTime: '00:00',
                    nowTime: '00:00',
                    baifenbi: 0,
                })
            });
            const crrList = this.data.list;
            if (this.changeMusic(item)) {
                crrList.push(item)
                this.setData({
                    list: crrList,
                    musicIndex: this.data.list.length - 1
                })
            }
            this.innerAudioContext.src = this.data.baseUrl + this.data.list[this.data.musicIndex].songfile;
            this.innerAudioContext.play();
            this.innerAudioContext.onPlay(() => {
                this.setData({
                    playType: true
                });
            })
            this.innerAudioContext.onPause(() => {
                this.setData({
                    playType: false
                });
            })
            const that = this;
            this.innerAudioContext.onTimeUpdate(() => {
                console.log('时间');
                let duration = that.innerAudioContext.duration;
                let currentTime = that.innerAudioContext.currentTime;
                if (duration && currentTime) {
                    this.setData({
                        nowTime: that.formatTime(currentTime),
                        allTime: that.formatTime(duration),
                        baifenbi: duration ? Number((currentTime / duration * 100).toFixed(2)) : 0
                    });
                }

            });
            this.innerAudioContext.onEnded(() => {
                if (that.data.playMode === 'sequential') {
                    that.next();
                } else if (that.data.playMode === 'single') {
                    // 单曲循环：重置当前时间并重新播放
                    this.play()
                } else { // 随机播放
                    let newIndex;
                    do {
                        newIndex = Math.floor(Math.random() * that.data.playlist.length);
                    } while (newIndex === that.data.playIndex); // 尝试避免重复（但不一定总是成功）
                    that.playMusic(newIndex);
                    that.play();
                }
            });
        },
        random(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        //   单曲循环
        singlePlayback() {
            this.setData({
                playMode: 'single',
            });
            wx.showToast({
                title: '单曲循环',
                icon: 'none'
            })
        },
        playsClick() {
            console.log('');
            this.innerAudioContext.play()
        },
        pauseClick() {
            this.innerAudioContext.pause()
        },
        playIndexClick(e) {
            const mode = parseInt(e.currentTarget.dataset.index);
            this.innerAudioContext.loop = mode === 1;
            if (mode == 3) {
                this.playRandomMusic();
            }
            if (mode == 2) {
                this.playMusic(this.data.musicIndex + 1);
            }
            this.setData({
                playIndex: mode
            });
            // 如果是切换到列表播放，并且当前是随机或单曲循环，可能需要重置播放列表或索引
        },
        playRandomMusic() {
            const randomIndex = this.random(0, this.data.list.length - 1);
            this.playMusic(randomIndex);
        },
        delListClick(e) {
            const index = e.currentTarget.dataset.index;
            const newList = this.data.list.filter((_, i) => i !== index);

            if (index === this.data.musicIndex) {
                if (newList.length === 0) {
                    this.innerAudioContext.stop();
                    this.setData({
                        list: [],
                        musicIndex: -1
                    });
                } else {
                    const newIndex = Math.min(index, newList.length - 1);
                    this.playMusic(newIndex);
                }
            }

            this.setData({
                list: newList
            });
        },
        playListClick(e) {
            const index = e.currentTarget.dataset.index*1;
            this.playMusic(index);
            this.innerAudioContext.play()
        },
    }
});