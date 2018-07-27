<template>
      <el-row class="tac">
          <el-col :span="24">
              <el-menu theme="drak" :default-active="$route.path" router @open="handleOpen" @close="handleClose">
                <el-submenu  v-for="(item,menuIndex) in menuData" :key="menuIndex" :index="item.menuId">
                  <template slot="title"> <i class="el-icon-menu"></i> <span>{{item.menuName}}</span></template>
                  <el-menu-item v-for="(subItem,subIndex) in item.subMenu" :key="subIndex" :index="subItem.menuUrl" @click="addTab()">
                      <i class="el-icon-setting"></i>{{subItem.menuName}}
                  </el-menu-item>
                </el-submenu>
              </el-menu>
          </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'aside-vue',
  props: ['menuData'],
  data: function () {
    return {
      updateData: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 菜单打开
    addTab: function () {
      this.$root.bus.$emit('busTransfer', '我是通过bus传输过来的数据')
      // this.$emit('updateDataFunc', '我是子组件更新完成的数据返回')
      // this.$root.bus.$emit('asideToMain_test', '我是菜单组件更新完成的数据返回')
    }
  }
}
</script>

<style scoped>

</style>
