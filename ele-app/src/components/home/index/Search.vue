<template>
<div class="search" :class="{active: isActive}">
    <div class="text">搜索商家、商品名称</div>
</div>
</template>

<script>
export default {
    name: 'search-bar',
    props: {
        isActive: Boolean
    }
}
</script>

<style scoped>
.search{
    padding: 5px 12px;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    background: linear-gradient(90deg,#0af,#0085ff);
}
.search.active{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
}
.search .text{
    background: #fff;
    color: #ccc;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    height: 30px;
    width: 100%;
}
</style>

