<script def>
{
  "navigationBarTitleText": "Discovery"
}
</script>

<script setup>
import wx from 'wx';
import { scenarios } from '../../lib/scenarios.js';

const scenario = scenarios['retro-poster'];

export default {
  data: {
    title: scenario.title,
    category: scenario.category,
    insight: scenario.insight,
    whyItMatters: scenario.whyItMatters,
    story: scenario.story,
    deepDive: scenario.deepDive,
    saved: false,
    expanded: false,
  },
  toggleSaved() {
    this.setData({
      saved: !this.data.saved,
    });
  },
  toggleDeepDive() {
    this.setData({
      expanded: !this.data.expanded,
    });
  },
  goToChallenge() {
    wx.navigateTo({
      url: '/pages/challenge/index',
    });
  },
}
</script>

<page>
  <view class="screen">
    <view class="header-card">
      <text class="eyebrow">DISCOVERY LOCKED</text>
      <text class="title">{{ title }}</text>
      <text class="meta">{{ category }}</text>
      <text class="summary">{{ insight }}</text>
    </view>

    <view class="info-card">
      <text class="card-label">为什么值得看</text>
      <text class="card-copy">{{ whyItMatters }}</text>
    </view>

    <view class="info-card">
      <text class="card-label">故事背景</text>
      <text class="card-copy">{{ story }}</text>
    </view>

    <view class="info-card" ink:if="{{ expanded }}">
      <text class="card-label">深挖结果</text>
      <text class="card-copy">{{ deepDive }}</text>
    </view>

    <view class="action-row">
      <button class="ghost-button" bindtap="toggleDeepDive">深挖</button>
      <button class="ghost-button {{ saved ? 'saved' : '' }}" bindtap="toggleSaved">{{ saved ? '已收藏' : '收藏' }}</button>
      <button class="primary-button" bindtap="goToChallenge">挑战模式</button>
    </view>
  </view>
</page>

<style>
.screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background:
    radial-gradient(circle at top right, rgba(92, 200, 255, 0.16), transparent 34%),
    linear-gradient(180deg, rgba(2, 8, 18, 0.98), rgba(8, 17, 32, 0.98));
}

.header-card,
.info-card {
  border: 1px solid rgba(98, 255, 220, 0.26);
  border-radius: 18px;
  padding: 18px;
  background: rgba(8, 20, 36, 0.82);
  box-shadow: 0 0 18px rgba(98, 255, 220, 0.08);
}

.eyebrow,
.card-label {
  color: #69f7d6;
  font-size: 12px;
  letter-spacing: 1.4px;
}

.title {
  display: block;
  margin-top: 8px;
  color: #ffffff;
  font-size: 28px;
  line-height: 32px;
  font-weight: 700;
}

.meta {
  display: block;
  margin-top: 6px;
  color: rgba(105, 247, 214, 0.9);
  font-size: 14px;
}

.summary,
.card-copy {
  display: block;
  margin-top: 10px;
  color: rgba(228, 248, 245, 0.84);
  font-size: 15px;
  line-height: 22px;
}

.action-row {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.ghost-button,
.primary-button {
  flex: 1;
  border-radius: 14px;
  font-size: 15px;
  line-height: 22px;
  padding: 10px 8px;
}

.ghost-button {
  color: #69f7d6;
  border: 1px solid rgba(105, 247, 214, 0.45);
  background: rgba(12, 32, 46, 0.78);
}

.ghost-button.saved {
  color: #021116;
  background: linear-gradient(90deg, #69f7d6, #5cc8ff);
  border: none;
}

.primary-button {
  color: #04121a;
  background: linear-gradient(90deg, #69f7d6, #5cc8ff);
  border: none;
  font-weight: 700;
}
</style>
