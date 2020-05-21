let defaultSong = { // 播放器中音乐
}
try {
  if (localStorage.SongList) {
    defaultSong = JSON.parse(localStorage.SongList)
  }
} catch (e) {}
let nowsong = [] // 播放器中音乐
try {
  if (localStorage.NowList) {
    nowsong = JSON.parse(localStorage.NowList)
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
// daily
let dailyrec = []
try {
  if (localStorage.daily) {
    dailyrec = JSON.parse(localStorage.daily)
  }
} catch (e) {}

let lishi = []
try {
  if (localStorage.history) {
    lishi = JSON.parse(localStorage.history)
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
  history: lishi,
  playlist: dataList, // 歌单
  userlist: user, // 用户数据
  level: grade, // 用户等级
  hotlist: '', // 搜索排行榜
  currentTime: '', // 当移动进度条时播放器的时间进度
  daily: dailyrec, // 推荐歌单
  search: '', // 历史记录
  NowList: nowsong,
  recplaylist: [],
  carousellist: [{
    'copywriter': 'http://p1.music.126.net/S2-z8dmrkZFZUYBOSMmy9w==/109951163185997584.jpg',
    'coverImgUrl': '音色可脆如银铃，也可细腻如丝',
    'playCount': 1855151
  }, {
    'copywriter': 'http://p2.music.126.net/NxBuzU7cZW9lbrh6GQOizQ==/19074327718953837.jpg',
    'coverImgUrl': '青春被时间抛弃，民谣被时光拾起',
    'playCount': 19233614
  }, {
    'copywriter': 'http://p1.music.126.net/NWTxt74aTH4bejNmRb7y4Q==/18765364953000742.jpg',
    'coverImgUrl': '窝睡在四季与昼夜之间',
    'playCount': 3023940
  }]

}
