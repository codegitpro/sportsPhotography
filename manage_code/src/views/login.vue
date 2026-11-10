<template>
	<div class="login_view">
<div class="left"><span>{{projectName}}</span></div>
<div class="form" style="z-index: 1;">
    <div class="logo"></div>
    <div class="projectName">账号登录</div>
    <div class="tip">欢迎回来</div>
				<div class="form-item userName" v-if="loginType==1">
					<div class="label">
						<el-icon>
							<User />
						</el-icon>
					</div>
					<el-input class="item-input" v-model="loginForm.username" placeholder="请输入账号" name="username" />
				</div>

				<div class="form-item password" v-if="loginType==1">
					<div class="label">
						<el-icon>
							<Lock />
						</el-icon>
					</div>
					<el-input class="item-input" v-model="loginForm.password" type="password" show-password placeholder="请输入密码" @keydown.enter.native="handleLogin"  />
				</div>


				<div class="form-item roles" v-if="userList.length>1">
					<div class="label">
						<el-icon>
							<Discount />
						</el-icon>
					</div>
				  <el-select v-model="loginForm.role" placeholder="请选择用户类型">
					<el-option v-for="(item,index) in userList" :label="item.roleName" :value="item.roleName"></el-option>
				  </el-select>
				</div>

				<el-button class="login" v-if="loginType==1" @click="handleLogin">登录</el-button>


    <div class="forget-row">
        <div class="register-row">

        </div>

    </div>
    <div class="form-circle1"></div>
    <div class="form-circle2"></div>
</div>

	</div>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
		onMounted,
		onUnmounted,
	} from "vue";
	import { useStore } from 'vuex'
	const store = useStore()
	const projectName = ref(`运动摄影小程序`)
	const userList = ref([])
	const menus = ref([])
	const loginForm = ref({
		role: '',
		username: '',
		password: ''
	})
	const tableName = ref('')
	const loginType = ref(1)
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const handleLogin = () => {
		if (!loginForm.value.username) {
			context?.$toolUtil.message('请输入用户名', 'error')
			
			return;
		}
		if (!loginForm.value.password) {
			context?.$toolUtil.message('请输入密码', 'error')
			return;
		}
		if (userList.value.length > 1) {
			if (!loginForm.value.role) {
				context?.$toolUtil.message('请选择角色', 'error')
				verifySlider.value.reset()
				return;
			}
			for (let i = 0; i < menus.value.length; i++) {
				if (menus.value[i].roleName == loginForm.value.role) {
					tableName.value = menus.value[i].pathName||menus.value[i].tableName;
				}
			}
		} else {
			tableName.value = userList.value[0].pathName||userList.value[0].tableName;
			loginForm.value.role = userList.value[0].roleName;
		}
		login()
	}
	const login = () => {
		context?.$http({
			url: `${tableName.value}/login?username=${loginForm.value.username}&password=${loginForm.value.password}`,
			method: 'post'
		}).then(res => {
			context?.$toolUtil.storageSet("Token", res.data.token);
			context?.$toolUtil.storageSet("role", loginForm.value.role);
			context?.$toolUtil.storageSet("sessionTable", tableName.value);
			context?.$toolUtil.storageSet("adminName", loginForm.value.username);
            //vuex中获取用户信息并保存
			store.dispatch('user/getSession').then(res=>{
                context?.$router.push('/')
            })
		}, err => {
		})
	}
	//获取菜单
	const getMenu=()=> {
      let params = {
        page: 1,
        limit: 1,
        sort: 'id',
      }

      context?.$http({
        url: "menu/list",
        method: "get",
        params: params
      }).then(res => {
          menus.value = JSON.parse(res.data.data.list[0].menujson)
          for (let i = 0; i < menus.value.length; i++) {
            if (menus.value[i].hasBackLogin=='是') {
              userList.value.push(menus.value[i])
            }
          }
			loginForm.value.role = userList.value[0].roleName
          context?.$toolUtil.storageSet("menus", JSON.stringify(menus.value));
      })
    }
	//初始化
	const init = () => {
		getMenu();
	}
	onMounted(()=>{
		init()


	})
</script>

<style lang="scss">
	.login_view {
        background-image: url("http://localhost:8080/sportsPhotography/file/31c1ea7de66648dabe51693a2641da2d.webp")!important;
	}
.login_view {
    background:url(http://localhost:8080/sportsPhotography/file/31c1ea7de66648dabe51693a2641da2d.webp) no-repeat center top / 100% 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.login_view .left {
    width: 30%;
    height: 100%;
    background: var(--theme);
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    position: absolute;
    left:0;
    top:0;
}
.login_view .left span{
    color: #fff;
    font-size: 30px;
}

.login_view .form {
    background: #fff;
    width: 600px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 30px 40px 30px 40px;
    border-radius: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    overflow: hidden;
    margin: 0 0 0 30%;
}


.login_view .projectName {
    font-size: 30px;
    color: #000;
    font-weight: 700;
    width: 100%;
    text-align: left;
    margin-top: 20px;
    text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.3);
}

.login_view .tip {
    font-size: 16px;
    width: 100%;
    text-align: left;
    margin: 10px 0;
    color: #666;
}

.login_view .form-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;
    background: #fafafa!important;
    padding: 0;
    border: 1px solid #d1d5db;
    line-height: 50px;
    border-radius: 10px;
}

.login_view .el-input__wrapper {
    border: none;
    outline: none;
    box-shadow: none!important;
    padding: 0;
    background: none!important;
}

.login_view .form-item .el-input__inner {
    background:none;
    height: var(--input-height);
    line-height: var(--input-height);
    border: 0px solid #d1d5db;
    padding: 0 10px;
    border-radius: 6px;
}
.login_view .form-item .el-input__inner:focus {
    border: 0px solid #a7b5ca;
}

.login_view .form-item .el-select .el-select__wrapper{
    background: none;
    height: var(--input-height);
    line-height:var(--input-height);
    box-shadow:none;
    border: 0px solid #d1d5db;
    padding: 0 10px;
    border-radius: 6px;    
}
.login_view .form-item .el-select .el-select__wrapper:focus {
    border: 0px solid #a7b5ca;
}

.login_view .label {
    background: none;
    color: #9ca3af;
    padding: 0 10px;
}
.login_view .label .el-icon{
    font-size:18px;
    top: 4px;
}
.el-input .el-input__password {
    margin-right: 10px;
}
.login_view .code-info {
    width: 120px;
    background: #f3f4f6;
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    position: absolute;
    right: -140px;
    border-radius: 10px;
    border: 0px dashed #2B2D42;
    height: var(--input-height);
    line-height: var(--input-height);
}

.login_view .form-item.code {
    margin-right: 140px;
    position: relative;
}

.login_view .form-item.roles {
    position: relative;
    background: none;
    display: flex;
    gap: 0px;
    padding: 0;
}

.login_view .el-radio.role {
    background: #fff;
    border: 1px solid #eee;
    padding: 10px;
    flex: 1;
    margin-right: 0;
    border-radius: 8px;
}

.login_view .login {
    width: 100%;
    margin-top: 20px;
    height: 50px;
    background: var(--theme);
    border: none;
    color: #fff;
    font-size: 18px;
    border-radius: 8px;
}
.login_view .face{
    width: 100%;
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    background: var(--theme50);
    border: none;
    color: #fff;
    font-size: 18px;
    text-align: center;
    margin-left: 0;
    border-radius: 8px;
}

.login_view .forget-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.login_view .register {
    background: none;
    border: none;
    font-size: 16px;
}

.login_view .register:hover{
    color:var(--theme);
}

.login_view .forget {
    background: none;
    border: 0;
    font-size: 16px;   
}
.login_view .forget:hover{
    color:var(--theme);
}

.login_view .logo {
    background: url(http://localhost:8080/sportsPhotography/file/889d208e5ddd4107bce6600713cdf6d1.webp);
    background-size: 100% 100%;
    width: 80px;
    height: 80px;
    animation: float 3s ease-in-out infinite;
    display: none;
}

</style>