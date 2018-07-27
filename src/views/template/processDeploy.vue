<template>
  <div class="deploy">
    bus传输过来的值{{busTransferData}}
  </div>
</template>

<script>
export default {
  name: 'processDeploy-vue',
  data () {
    return {
      loading: false,
      html: '',
      url: 'http://localhost:8088/#/template/deploy',
      iframeHeight: '500px',
      busTransferData: ''
    }
  },
  created () {
    let self = this
    this.$root.bus.$on('busTransfer', (data) => {
      self.busTransferData = data
    })
  },
  mounted () {
    // this.load(this.url)
    // const vm = this
    // setTimeout(() => {
    //   // this.iframeHeight = '700px'
    //   debugger
    //   vm.$refs.myiframe.height = '700px'
    // }, 3000)
  },
  methods: {
    load (url) {
      debugger
      var vm = this
      if (url && url.length > 0) {
        // 加载中
        vm.loading = true
        // let param = {
        //   accept: 'text/html, text/plain'
        // }
        vm.$ajax({ type: 'get', url: vm.url }).then((response) => {
          debugger
          vm.loading = false
          // 处理HTML显示
          vm.html = response.data
        }).catch(() => {
          vm.loading = false
          vm.html = '加载失败'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .deploy{
    .iframe{
    }
  }
</style>
