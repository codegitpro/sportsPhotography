<template>
	<div class="forget_view">
<div class="form" style="z-index: 1;">
    <div class="pageTitle">{{pageTitle}}</div>
				<div class="tab_view">
					<div class="tab" :class="pageType==1?'tab_active':''">输入账号</div>
					<div class="tab" :class="pageType==2?'tab_active tab_active1':''"> 输入密保</div>
					<div class="tab" :class="pageType==3?'tab_active tab_active1 tab_active2':''">重置密码</div>
				</div>

			<div class="form-box">
			</div>

                    <el-button v-if="pageType==1" class="get_btn" @click="getSecurity">获取密保</el-button>
                    <el-button v-if="pageType==2" class="valid_btn" @click="validateSecurity">确认密保</el-button>
					<el-button v-if="pageType==3" class="update_btn" @click="updatePassword">重置密码</el-button>

    <div class="back" @click="close">已有账号，直接登录</div>
    <div class="form-circle1"></div>
    <div class="form-circle2"></div>
</div>
<div class="circle1"></div>
<div class="circle2"></div>
	</div>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
        onMounted,
		computed,
	} from 'vue';
    import { useRoute } from 'vue-router'
    const route = useRoute()
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context.$project.projectName
    onMounted(()=>{
    })
	const pageType = ref(1)
	const pageTitle = computed(()=>{
		return pageType.value==1?'输入账号':pageType.value==2?'输入密保':'重置密码'
	})
	const forgetForm = ref({})
	const userForm = ref({})
	//返回登录
	const close = () => {
		context?.$router.push({
			path: "/login"
		});
	}
</script>

<style lang="scss">
	.forget_view {
        background-image: url("http://localhost:8080/sportsPhotography/file/31c1ea7de66648dabe51693a2641da2d.webp")!important;
	}
.forget_view {
    background:url(http://localhost:8080/sportsPhotography/file/31c1ea7de66648dabe51693a2641da2d.webp) no-repeat center top / 100% 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 50px;
}

.forget_view .form {
    background: #fffdfd;
    width: 600px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 20px 60px 20px 60px;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    text-align: center;
}

.forget_view .pageTitle {
    font-size: 24px;
    color: #333;
    font-weight: 700;
    width: 100%;
    text-align: center;
    margin-top: 20px;
}
.forget_view .logo {
    background: url(http://localhost:8080/sportsPhotography/file/889d208e5ddd4107bce6600713cdf6d1.webp);
    background-size: 100% 100%;
    width: 80px;
    height: 80px;
    animation: float 3s ease-in-out infinite;
    margin: 0 auto;
    display: none;
}
 @keyframes float{
    0%,  100% {
        transform: translateY(0);
    }
     50% {
        transform: translateY(-10px);
    }
}


.forget_view .register_form {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    padding: 0 50px;
}

.forget_view .list_item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    background: #fff;
}

.forget_view .item_label {
    min-width: 100px;
    text-align: right;
}

.forget_view .register {
    background: var(--theme);
    border: none;
    color: #fff;
    width: 60%;
    margin-top: 30px;
    height: 40px;
    font-size: 18px;
}

.forget_view .back {
    width: 50%;
    margin: 20px auto;
}

.forget_view .tab {
    width: calc(33.3333%);
    padding: 12px 0px;
    box-sizing: border-box;
    text-align: center;
}
.forget_view .tab.tab_active {
    width: calc(33.3333%);
    padding: 12px 0px;
    box-sizing: border-box;
    text-align: center;
    background: var(--theme);
    color: rgb(255, 255, 255);
    clip-path: polygon(90% 0, 100% 50%, 90% 100%, 10% 100%, 0 51%, 10% 0);
}
.forget_view .tab_view {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 30px 0px;
    font-size: 16px;
}

.forget_view .pageTitle {
    font-size: 24px;
    font-weight: 700;
    width: 100%;
    text-align: center;
    margin-top: 20px;
}

.forget_view .el-input.list_inp {
}

.forget_view .list_item .list_inp .el-input__wrapper{
    background: none;
    box-shadow: none;
    padding: 0;
}
.forget_view .list_item .list_inp .el-input__inner {
    background: none;
    height: var(--input-height);
    line-height: var(--input-height);
    border: 0px solid rgba(193,42,49,0.3);
    padding: 0 10px;
    border-radius: 6px;
}
.forget_view .list_item .list_inp .el-input__inner:focus {
    border: 0px solid rgba(193,42,49,1);
}

.forget_view .el-select__wrapper {
    height: 40px;
    background: none;
    box-shadow: none;
}

.forget_view .list_item .el-select .el-select__wrapper{
    background: none;
    height: var(--input-height);
    line-height:var(--input-height);
    box-shadow:none;
    border: 0px solid rgba(193,42,49,0.3);
    padding: 0 10px;
    border-radius: 6px;    
}
.forget_view .list_item .el-select .el-select__wrapper:focus {
    border: 0px solid rgba(193,42,49,1);
}

.forget_view button.el-button {
    background: var(--theme);
    font-size: 16px;
    color: #fff;
    width: 50%;
    border: none;
    height: 40px;
    margin-top: 30px;
}

</style>