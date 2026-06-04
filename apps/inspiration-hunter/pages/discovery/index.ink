<script def>
{
  "navigationBarTitleText": "Discovery",
  "description": "A discovery result page that explains the locked object's identity, story, and why it matters, then offers deeper exploration or challenge mode.",
  "schema": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "Display title of the discovered object."
        },
        "category": {
          "type": "string",
          "description": "Object category or content type."
        },
        "insight": {
          "type": "string",
          "description": "Short first insight for the object."
        },
        "whyItMatters": {
          "type": "string",
          "description": "Explanation of why the object is worth noticing."
        },
        "story": {
          "type": "string",
          "description": "Narrative context shown in the story card."
        },
        "deepDive": {
          "type": "string",
          "description": "Expanded interpretation revealed by the deep-dive action."
        },
        "saved": {
          "type": "boolean",
          "description": "Whether the discovery has been saved locally in the current session."
        },
        "expanded": {
          "type": "boolean",
          "description": "Whether the deep-dive section is visible."
        }
      }
    }
  }
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

    <view class="info-stack">
      <view class="info-card">
        <text class="card-label">为什么值得看</text>
        <text class="card-copy">{{ whyItMatters }}</text>
      </view>

      <view class="info-card" ink:if="{{ expanded }}">
        <text class="card-label">深挖结果</text>
        <text class="card-copy">{{ deepDive }}</text>
      </view>

      <view class="info-card" ink:else>
        <text class="card-label">故事背景</text>
        <text class="card-copy">{{ story }}</text>
      </view>
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
  height: 150px;
  width: 448px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top right, rgba(92, 200, 255, 0.16), transparent 34%),
    linear-gradient(180deg, rgba(2, 8, 18, 0.98), rgba(8, 17, 32, 0.98));
}

.header-card,
.info-card {
  box-sizing: border-box;
  border: 1px solid rgba(98, 255, 220, 0.26);
  border-radius: 14px;
  padding: 9px;
  background: rgba(8, 20, 36, 0.82);
  box-shadow: 0 0 18px rgba(98, 255, 220, 0.08);
}

.header-card {
  position: absolute;
  left: 8px;
  top: 8px;
  width: 132px;
  height: 134px;
}

.info-stack {
  position: absolute;
  left: 148px;
  top: 8px;
  width: 196px;
  height: 134px;
}

.info-card {
  height: 64px;
  margin-bottom: 6px;
  overflow: hidden;
}

.eyebrow,
.card-label {
  color: #69f7d6;
  font-size: 10px;
  letter-spacing: 1px;
}

.title {
  display: block;
  margin-top: 5px;
  color: #ffffff;
  font-size: 17px;
  line-height: 19px;
  font-weight: 700;
}

.meta {
  display: block;
  margin-top: 4px;
  color: rgba(105, 247, 214, 0.9);
  font-size: 10px;
}

.summary,
.card-copy {
  display: block;
  margin-top: 4px;
  color: rgba(228, 248, 245, 0.84);
  font-size: 10px;
  line-height: 13px;
}

.action-row {
  position: absolute;
  right: 8px;
  top: 8px;
  width: 88px;
  height: 134px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.ghost-button,
.primary-button {
  display: block;
  height: 38px;
  margin: 0;
  margin-bottom: 5px;
  border-radius: 11px;
  font-size: 11px;
  line-height: 15px;
  padding: 4px 6px;
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
