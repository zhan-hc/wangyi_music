export default {
  showCategory (state) { // 显示左侧panel
    state.CategoryStatus = true
  },
  hideCategory (state) { // 隐藏左侧panel
    state.CategoryStatus = false
  },
  changeAudioStatus (state) { // 改变播放器的状态
    state.AudioStatus = !state.AudioStatus
  },
  showMenu (state) { // 菜单显示
    state.MenuStatus = true
  },
  hideMenu (state) { // 菜单隐藏
    state.MenuStatus = false
  },
  PlayAudio (state) { // 播放
    state.AudioStatus = true
  },
  PauseAudio (state) { // 暂停
    state.AudioStatus = false
  },
  SongTime (state, time) { // 改变音频的总时间
    state.SongSumTime = time
  },
  UpdateSongNow (state, time) { // 改变音频正在播放的时间
    state.SongNowTime = time
  },
  UpdateSongX (state, x) { // 改变进度条小点的位移
    state.Song_X = x
  },
  UpdateSongRate (state, x) { // 改变已播放过的进度条的位移
    state.SongRate = x
  },
  UpdateSongWidth (state, y) { // 设置进度条的长度
    state.SongWidth = y
  },
  UpdateSpotMove (state, x) { // 改变鼠标的点击的位移
    state.SpotMove = x
  },
  ChangeSong (state, song) { // 改变歌曲
    state.SongList = song
    try {
      localStorage.SongList = JSON.stringify(song)
    } catch (e) {}
  }
}
