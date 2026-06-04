<script def>
{
  "navigationBarTitleText": "Inspiration Hunter"
}
</script>

<script setup>
import wx from 'wx';

export default {
  data: {
    status: '扫描中',
    targetLabel: '复古电影海报',
    confidence: '92%',
    pulse: 'LOCKED',
  },
  beginDiscovery() {
    wx.navigateTo({
      url: '/pages/discovery/index',
    });
  },
}
</script>

<page>
  <view class="screen">
    <view class="hero-panel">
      <text class="eyebrow">FUTURE EXPLORER</text>
      <text class="title">灵感猎手</text>
      <text class="subtitle">看见现实，立即展开一场 AI 探索。</text>
    </view>

    <view class="scanner-panel">
      <view class="scanner-ring">
        <text class="scanner-ring-text">{{ pulse }}</text>
      </view>

      <view class="target-card">
        <text class="target-label">当前锁定目标</text>
        <text class="target-title">{{ targetLabel }}</text>
        <text class="target-meta">识别可信度 {{ confidence }}</text>
        <text class="target-status">{{ status }}</text>
      </view>
    </view>

    <view class="intel-panel">
      <text class="panel-title">猎手提示</text>
      <text class="panel-copy">检测到高故事价值目标，建议立即展开解析，进入沉浸式探索界面。</text>
    </view>

    <button class="primary-button" bindtap="beginDiscovery">开始解析</button>
  </view>
</page>

<style>
.screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px;
  background:
    linear-gradient(180deg, rgba(2, 8, 18, 0.98), rgba(6, 17, 34, 0.98)),
    #020611;
}

.hero-panel,
.scanner-panel,
.intel-panel {
  border: 1px solid rgba(82, 255, 209, 0.28);
  border-radius: 18px;
  padding: 18px;
  background: rgba(10, 23, 40, 0.78);
  box-shadow: 0 0 18px rgba(82, 255, 209, 0.12);
}

.eyebrow {
  color: #67f7d0;
  font-size: 12px;
  letter-spacing: 2px;
  opacity: 0.92;
}

.title {
  display: block;
  margin-top: 10px;
  color: #f2fffd;
  font-size: 30px;
  line-height: 34px;
  font-weight: 700;
}

.subtitle {
  display: block;
  margin-top: 10px;
  color: rgba(214, 255, 249, 0.8);
  font-size: 14px;
  line-height: 20px;
}

.scanner-panel {
  display: flex;
  align-items: center;
  gap: 16px;
}

.scanner-ring {
  width: 122px;
  height: 122px;
  border-radius: 61px;
  border: 2px solid #61ffd7;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(97, 255, 215, 0.28), inset 0 0 20px rgba(97, 255, 215, 0.12);
}

.scanner-ring-text {
  color: #61ffd7;
  font-size: 16px;
  font-weight: 700;
}

.target-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.target-label,
.panel-title {
  color: rgba(103, 247, 208, 0.94);
  font-size: 12px;
  letter-spacing: 1px;
}

.target-title {
  color: #ffffff;
  font-size: 24px;
  line-height: 28px;
  font-weight: 700;
}

.target-meta,
.target-status,
.panel-copy {
  color: rgba(227, 248, 244, 0.82);
  font-size: 14px;
  line-height: 20px;
}

.primary-button {
  margin-top: auto;
  background: linear-gradient(90deg, #61ffd7, #5cc8ff);
  color: #031219;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  padding: 10px 18px;
  border: none;
}
</style>
