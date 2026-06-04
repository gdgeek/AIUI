<script def>
{
  "navigationBarTitleText": "Inspiration Hunter",
  "description": "A glasses-native scan landing page that locks onto a real-world object and starts the Inspiration Hunter discovery flow.",
  "schema": {
    "data": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string",
          "description": "Current scan state shown on the target card."
        },
        "targetLabel": {
          "type": "string",
          "description": "Name of the object currently locked by the glasses."
        },
        "confidence": {
          "type": "string",
          "description": "Human-readable confidence signal for the locked target."
        },
        "pulse": {
          "type": "string",
          "description": "Short scanner status shown inside the scan ring."
        }
      }
    }
  }
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
      <text class="subtitle">看见现实，立即展开 AI 探索。</text>
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

    <view class="action-row">
      <text class="panel-title">猎手提示</text>
      <text class="panel-copy">高故事价值目标已锁定。</text>
      <button class="primary-button" bindtap="beginDiscovery">开始解析</button>
    </view>
  </view>
</page>

<style>
.screen {
  height: 150px;
  width: 448px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(2, 8, 18, 0.98), rgba(6, 17, 34, 0.98)),
    #020611;
}

.hero-panel,
.scanner-panel,
.action-row {
  position: absolute;
  box-sizing: border-box;
  border: 1px solid rgba(82, 255, 209, 0.28);
  border-radius: 14px;
  padding: 10px;
  background: rgba(10, 23, 40, 0.78);
  box-shadow: 0 0 18px rgba(82, 255, 209, 0.12);
}

.hero-panel {
  left: 8px;
  top: 8px;
  width: 136px;
  height: 134px;
}

.eyebrow {
  color: #67f7d0;
  font-size: 10px;
  letter-spacing: 1.4px;
  opacity: 0.92;
}

.title {
  display: block;
  margin-top: 6px;
  color: #f2fffd;
  font-size: 24px;
  line-height: 26px;
  font-weight: 700;
}

.subtitle {
  display: block;
  margin-top: 6px;
  color: rgba(214, 255, 249, 0.8);
  font-size: 11px;
  line-height: 15px;
}

.scanner-panel {
  left: 152px;
  top: 8px;
  width: 184px;
  height: 134px;
}

.scanner-ring {
  position: absolute;
  left: 10px;
  top: 38px;
  width: 58px;
  height: 58px;
  border-radius: 29px;
  border: 2px solid #61ffd7;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(97, 255, 215, 0.28), inset 0 0 20px rgba(97, 255, 215, 0.12);
}

.scanner-ring-text {
  color: #61ffd7;
  font-size: 11px;
  font-weight: 700;
}

.target-card {
  position: absolute;
  left: 78px;
  top: 22px;
  width: 92px;
}

.target-label,
.panel-title {
  color: rgba(103, 247, 208, 0.94);
  font-size: 10px;
  letter-spacing: 1px;
}

.target-title {
  color: #ffffff;
  font-size: 16px;
  line-height: 19px;
  font-weight: 700;
}

.target-meta,
.target-status,
.panel-copy {
  color: rgba(227, 248, 244, 0.82);
  font-size: 10px;
  line-height: 14px;
}

.action-row {
  right: 8px;
  top: 8px;
  width: 96px;
  height: 134px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}

.primary-button {
  margin: 0;
  background: linear-gradient(90deg, #61ffd7, #5cc8ff);
  color: #031219;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  padding: 6px 8px;
  border: none;
}
</style>
