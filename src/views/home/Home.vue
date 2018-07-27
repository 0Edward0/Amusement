<!--suppress ALL -->
<template>
    <el-container class="home">
      <el-header>
        <el-row :gutter="10">
          <el-col :span="19">
            <span class="title">{{title}}</span>
          </el-col>
          <el-col :span="5">
            <span class="title">当前语言:{{language}}</span>
            <el-dropdown class="drop-style" trigger="hover" :hide-timeout="hideTimeout">
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in settingData" :key="index">
                  <router-link :to="item.menuUrl" class="route-link">{{item.menuName}}</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="title">{{author}}</span>

           </el-col>
        </el-row>

      </el-header>
      <el-container>
        <el-aside width="200px">
            <!--子父组件间传值-->
           <AsideNav :menuData="menuData" v-on:updateDataFunc="updateDataFunc"></AsideNav>
        </el-aside>
        <el-main>

          <!--<el-tabs v-model="menuTabValue" type="border-card" closable @tab-remove="removeTab">-->
          <!--<el-tab-pane-->
            <!--v-for="(item, tabIndex) in menuTabs"-->
            <!--:key="tabIndex"-->
            <!--:label="item.title"-->
            <!--:name="item.name"-->
          <!--&gt;-->
            <!--{{item.content}}-->
          <!--</el-tab-pane>-->
        <!--</el-tabs>-->

          <transition name="fade">
            <router-view class="view"></router-view>
          </transition>

        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import {AsideNav} from '@/views/home/layout'
export default {
  name: 'Home-vue',
  components: {AsideNav},
  data () {
    const menus_ = [{
      menuId: '1',
      menuName: '流程模板',
      subMenu: [
        {menuId: 1.1, menuName: '流程模板创建', menuUrl: '/template/process'},
        {menuId: 1.2, menuName: '流程模板发布', menuUrl: '/template/deploy'}
      ]
    },
    {
      menuId: '2',
      menuName: '流程实例',
      subMenu: [
        {menuId: 2.1, menuName: '启动流程实例', menuUrl: '/21'},
        {menuId: 2.2, menuName: '我发起的流程', menuUrl: '/22'}
      ]
    },
    {
      menuId: '3',
      menuName: '工作项',
      subMenu: [
        {menuId: 3.1, menuName: '工作项办理', menuUrl: '/31'},
        {menuId: 3.2, menuName: '我的工作项', menuUrl: '/32'},
        {menuId: 3.3, menuName: '我办理的工作项', menuUrl: '/33'}
      ]
    }
    ]
    const testTab = [{
      title: '首页',
      name: '0',
      content: 'Tab 1 content'
    }, {
      title: 'Tab 2',
      name: '2',
      content: 'Tab 2 content'
    }]
    const settingData_ = [
      {menuId: 1, menuName: '个人信息', menuUrl: '/setting'},
      {menuId: 2, menuName: '消息代办', menuUrl: '/todo'},
      {menuId: 2, menuName: '注销', menuUrl: '/logout'}
    ]
    return {
      title: '工作流引擎',
      menuTabValue: '0',
      tabIndex: 1,
      menuTabs: testTab,
      menuData: menus_,
      settingData: settingData_,
      hideTimeout: 1000
    }
  },
  computed: {
    author () {
      return this.$store.getters.author
    },
    language(){
      return this.$store.getters.language
    }
  },
  methods: {
    removeTab: () => {

    },
    updateDataFunc: function (data) {
      debugger
      this.updateData = data
    }
  }
}
</script>

<style lang="scss">
  @import '@/style/variables.scss';

  @mixin text-clor($color){
    color: $color;
    text-align: center;
  }
  .home{
    .el-header{
      background-color: #409EFF;
      line-height: 60px;
      @include text-clor($white)
    }

    .el-aside {
      background-color: $white;
      line-height: 200px;
      @include text-clor(#fff)
    }

    .el-main {
      background-color:  $white;
      line-height: 40px;
      padding:10px;
      @include text-clor(blue)
    }

    .title{
      color: $white;
    }
    .drop-style {
      margin-left:15px;
      @extend .title
    }
  }
</style>
