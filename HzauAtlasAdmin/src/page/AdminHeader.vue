<template>
    <div class="header_content">
        <div class="logo">
            <img class="logo" src="../assets/images/logo.jpg">
        </div>
        <div class="head_title">
            狮山图鉴
        </div>
        <div class="tip_icon">
            <img class="tip_icon" src="../assets/icon/tips.png">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.header_content {
    width: 100%;
    height: 3.8vw;
    display: flex;
    align-items: center;
    background: #ffffff;
    box-shadow: 0 16px 38px -12px rgb(0 0 0 / 7%), 0 4px 25px 0px rgb(0 0 0 / 2%), 0 8px 10px -5px rgb(0 0 0 / 1%);
}
.head_title
{
    font-size: 1.5vw;
    color: grey;
    font-weight: 300;
    margin-left: 2vw;
}
.logo{
    width: 3vw;
    height: 3vw;
    margin-left: 1vw;
}
.tip_icon
{
    width: 2.6vw;
    height: 2.6vw;
    margin-left: 41.3vw;

}
</style>