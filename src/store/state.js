let defaultSong = { // 播放器中音乐
  id: '0001',
  imgUrl: 'http://p2.music.126.net/6TNYBV2rezZLiwsGYBgmPw==/123145302311773.jpg',
  name: '幻听',
  author: '许嵩',
  icon: 'icon-sq',
  desc: '心酸纵有千百种 沉默不语最难过',
  mp3: 'http://music.163.com/song/media/outer/url?id=167655.mp3',
  background: 'linear-gradient(#0d080a,#8d0744,#311c25)'
}
try {
  if (localStorage.SongList) {
    defaultSong = JSON.parse(localStorage.SongList)
  }
} catch (e) {}
// 自己的歌单
let dataList = {
}
try {
  if (localStorage.playlist) {
    dataList = JSON.parse(localStorage.playlist)
  }
} catch (e) {}
// 用户数据
let user = {
}
try {
  if (localStorage.userlist) {
    user = JSON.parse(localStorage.userlist)
  }
} catch (e) {}
// 用户等级
let grade = 0
try {
  if (localStorage.level) {
    grade = JSON.parse(localStorage.level)
  }
} catch (e) {}
export default {
  CategoryStatus: false, // 设置菜单状态
  AudioStatus: false, // 播放器的状态
  MenuStatus: false, // 菜单状态
  SongNowTime: '00:00', // 音乐播放的当前时间
  Song_X: '57px', // 音频进度条的点的位置
  SongSumTime: '00:00', // 音频总时间
  SongRate: '0px', // 已播放的区域长度
  SongWidth: '', // 进度条的长素
  SpotMove: '',
  SongList: defaultSong, // 播放器中音乐
  Empty: false, // 清空搜索历史纪录的的弹出框状态
  History: ['枯木逢春', '国王与乞丐', '你想要的', '颜人中', '夏天的风'],
  playlist: dataList,
  userlist: user,
  level: grade,
  hotlist: ''
}
