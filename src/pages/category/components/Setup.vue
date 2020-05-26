<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <router-link to="/" tag="span" class="iconfont icon-fanhuipt"></router-link>
      <div class="title">设置</div>
    </div>
    <alert-exit v-show="exitstatus" @CancelAlert="CancelStatus" @ExitAccount="Exit_login"></alert-exit>
    <div class="content-wrapper" ref="WrapperScroll">
      <div class="container">
        <div class="split"></div>
        <div class="list-network">
          <div class="title">网络</div>
          <div class="list">
            <div class="item" v-for="list in netlist" :key="list.id">
              <div class="text">{{list.text}}</div>
              <el-switch class="switch" v-model="list.status" active-color="#FF0000" inactive-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="list-download">
          <div class="title">播放和下载</div>
          <div class="list">
            <div class="item" v-for="list in playlist" :key="list.id">
              <div class="text">{{list.text}}</div>
              <div v-show="list.result" class="result">{{list.result}}</div>
              <el-switch v-show="resultstatus(list.result)" class="switch" v-model="list.status" active-color="#FF0000" inactive-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="list-account">
          <div class="title">账号和隐私</div>
          <div class="list">
            <div class="item" v-for="list in acclist" :key="list.id">
              <div class="text">{{list.text}}</div>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="list-tool">
          <div class="title">工具</div>
          <div class="list">
            <div class="item" v-for="list in toollist" :key="list.id">
              <div class="text">{{list.text}}</div>
              <div v-show="list.result" class="result">{{list.result}}</div>
              <el-switch v-show="resultstatus(list.result)" class="switch" v-model="list.status" active-color="#FF0000" inactive-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="list-hardware">
          <div class="title">音乐硬件</div>
          <div class="list">
            <div class="item" v-for="list in warelist" :key="list.id">
              <div class="text">{{list.text}}</div>
              <div v-show="list.result" class="result">{{list.result}}</div>
              <el-switch v-show="resultstatus(list.result)" class="switch" v-model="list.status" active-color="#FF0000" inactive-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="list-about">
          <div class="title">账号和隐私</div>
          <div class="list">
            <div class="item" v-for="list in aboutlist" :key="list.id">
              <div class="text">{{list.text}}</div>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="toggle-account" @click="exit_alert">
          切换账号
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import AlertExit from '../components/AlertExit'
import axios from 'axios'
export default {
  name: 'CategorySetup',
  data () {
    return {
      exitstatus: false,
      netlist: [
        {
          id: '001',
          text: '使用2G/3G/4G网络播放',
          status: true
        },
        {
          id: '002',
          text: '使用2G/3G/4G网络下载',
          status: false
        },
        {
          id: '003',
          text: '动态页中Wi-Fi下自动播放视频',
          status: true
        },
        {
          id: '004',
          text: '视频中Wi-Fi下连续播放',
          status: true
        }
      ],
      playlist: [
        {
          id: '001',
          text: '在线播放音质',
          result: '自动'
        },
        {
          id: '002',
          text: '下载音质',
          result: '极高'
        },
        {
          id: '003',
          text: '鲸云音效',
          result: ''
        },
        {
          id: '004',
          text: '视频解码模式',
          result: '默认设置'
        },
        {
          id: '005',
          text: '视频后台播放',
          status: false
        },
        {
          id: '006',
          text: '边听边存',
          result: '未开启'
        },
        {
          id: '007',
          text: '设置下载目录',
          result: '存储卡1'
        },
        {
          id: '008',
          text: '缓存设置',
          result: ''
        },
        {
          id: '009',
          text: '允许与其他应用同时播放',
          status: true
        },
        {
          id: '010',
          text: '直播内容推荐',
          status: true
        },
        {
          id: '011',
          text: '音乐黑名单',
          result: ''
        }
      ],
      acclist: [
        {
          id: '001',
          text: '账号和隐私设置'
        },
        {
          id: '002',
          text: '消息隐私设置'
        },
        {
          id: '003',
          text: '登录保护'
        }
      ],
      toollist: [
        {
          id: '001',
          text: '桌面歌词',
          status: true
        },
        {
          id: '002',
          text: '锁定桌面工具',
          status: true
        },
        {
          id: '003',
          text: '显示歌词翻译',
          status: true
        },
        {
          id: '004',
          text: '跑步',
          status: false
        },
        {
          id: '005',
          text: '桌面小部件',
          result: ''
        },
        {
          id: '006',
          text: '锁屏显示',
          result: '云音乐锁屏'
        },
        {
          id: '007',
          text: '通知栏样式',
          result: '云音乐通知栏(自动)'
        },
        {
          id: '008',
          text: '切换语言',
          result: '默认'
        },
        {
          id: '009',
          text: '侧边栏管理',
          result: ''
        },
        {
          id: '010',
          text: '自动下载最新安装包',
          result: '仅Wi-Fi网络'
        }
      ],
      warelist: [
        {
          id: '001',
          text: '耳机线控切歌',
          result: '已开启'
        },
        {
          id: '002',
          text: '车载蓝牙歌词',
          status: false
        },
        {
          id: '003',
          text: '连接DLNA设备',
          result: '已开启'
        },
        {
          id: '004',
          text: '智能硬件',
          result: ''
        },
        {
          id: '005',
          text: 'HICAR功能',
          status: true
        }
      ],
      aboutlist: [
        {
          id: '001',
          text: '云音乐新手指南'
        },
        {
          id: '002',
          text: '帮助与反馈'
        },
        {
          id: '003',
          text: '关于网易云音乐'
        }
      ]
    }
  },
  mounted () {
    this.init_scroll()
  },
  methods: {
    resultstatus (list) { // 判断变量是否存在
      if (list === undefined) {
        return true
      } else {
        return false
      }
    },
    init_scroll () { // 初始化滚动条
      this.$nextTick(() => {
        if (!this.setScroll) {
          this.setScroll = new BScroll(this.$refs.WrapperScroll, {
            click: true
          })
        } else {
          this.setScroll.refresh()
        }
      })
    },
    exit_alert () { // 显示退出确认框
      this.exitstatus = true
    },
    CancelStatus (status) { // 子组件取消点击事件传值
      this.exitstatus = status
    },
    Exit_login (status) { // 子组件推出点击事件传值
      this.exitstatus = status
      axios.get('http://localhost:3000/logout').then(res => res.data).then(data => {
      })
      this.$router.push({
        path: '/login'
      })
    }
  },
  components: {
    AlertExit
  }
}
</script>

<style lang="stylus" scoped >
.wrapper
  position fixed
  display flex
  flex-flow column
  top 0
  left 0
  width 100%
  height 100%
  z-index 107
  // background #fff
  .header-wrapper
    position relative
    background #fff
    padding 10px
    .icon-fanhuipt
      display inline-block
      font-size 24px
      margin-right 10px
    .title
      display inline-block
      font-size 18px
  .content-wrapper
    flex 1
    background #fff
    padding 10px
    overflow hidden
    .container
      .split
        height 10px
        background #f3f5f7
      .list-network
        padding 10px 10px 0 10px
        .title
          color #999
          font-size 14px
        .item
          display flex
          border-bottom 1px solid #F0F0F0
          padding 15px 0px
          .text
            flex 1
      .list-download
        padding 10px 10px 0 10px
        .title
          color #999
          font-size 14px
        .item
          display flex
          border-bottom 1px solid #F0F0F0
          padding 15px 0px
          .text
            flex 1
          .result
            color #999
            font-size 14px
      .list-account
        padding 10px 10px 0 10px
        .title
          color #999
          font-size 14px
        .item
          display flex
          border-bottom 1px solid #F0F0F0
          padding 15px 0px
          .text
            flex 1
      .list-tool
        padding 10px 10px 0 10px
        .title
          color #999
          font-size 14px
        .item
          display flex
          border-bottom 1px solid #F0F0F0
          padding 15px 0px
          .text
            flex 1
          .result
            color #999
            font-size 14px
      .list-hardware
        padding 10px 10px 0 10px
        .title
          color #999
          font-size 14px
        .item
          display flex
          border-bottom 1px solid #F0F0F0
          padding 15px 0px
          .text
            flex 1
          .result
            color #999
            font-size 14px
      .list-about
        padding 10px 10px 0 10px
        .title
          color #999
          font-size 14px
        .item
          display flex
          border-bottom 1px solid #F0F0F0
          padding 15px 0px
          .text
            flex 1
      .toggle-account
        color #FF0000
        padding 15px
        text-align center
        letter-spacing 1px
        border-bottom 1px solid #F0F0F0
</style>
