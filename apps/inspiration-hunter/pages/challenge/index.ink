<script def>
{
  "navigationBarTitleText": "Challenge",
  "description": "A single-round challenge page that turns the discovery into a clue question and reveals the answer as the demo reward.",
  "schema": {
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "Challenge title shown to the user."
        },
        "prompt": {
          "type": "string",
          "description": "The clue question the user should answer."
        },
        "answer": {
          "type": "string",
          "description": "Answer revealed after the user completes the challenge."
        },
        "solved": {
          "type": "boolean",
          "description": "Whether the answer has been revealed."
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
    title: scenario.challengeTitle,
    prompt: scenario.challengePrompt,
    answer: scenario.challengeAnswer,
    solved: false,
  },
  solveChallenge() {
    this.setData({
      solved: true,
    });
  },
  backToDiscovery() {
    wx.navigateBack();
  },
}
</script>

<page>
  <view class="screen">
    <view class="challenge-card">
      <text class="eyebrow">HUNTER CHALLENGE</text>
      <text class="title">{{ title }}</text>
      <text class="prompt">{{ prompt }}</text>
    </view>

    <view class="answer-card" ink:if="{{ solved }}">
      <text class="answer-label">线索解锁成功</text>
      <text class="answer-text">{{ answer }}</text>
      <text class="answer-copy">你已经完成本轮探索，系统已记录一次高价值发现。</text>
    </view>

    <view class="answer-card" ink:else>
      <text class="answer-label">任务提示</text>
      <text class="answer-copy">观察画面里的霓虹、天际线和压迫式空间感，找到最能代表未来都市焦虑的元素。</text>
    </view>

    <view class="action-row">
      <button class="ghost-button" bindtap="backToDiscovery">返回结果</button>
      <button class="primary-button" bindtap="solveChallenge">{{ solved ? '已完成' : '揭晓答案' }}</button>
    </view>
  </view>
</page>

<style>
.screen {
  height: 150px;
  width: 448px;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  gap: 8px;
  padding: 8px;
  overflow: hidden;
  background:
    radial-gradient(circle at center, rgba(105, 247, 214, 0.12), transparent 42%),
    linear-gradient(180deg, rgba(2, 8, 18, 0.98), rgba(8, 18, 34, 0.98));
}

.challenge-card,
.answer-card {
  border: 1px solid rgba(92, 200, 255, 0.28);
  border-radius: 14px;
  padding: 10px;
  background: rgba(9, 22, 39, 0.84);
  box-shadow: 0 0 20px rgba(92, 200, 255, 0.09);
}

.challenge-card {
  flex: 1.18;
  min-width: 0;
}

.answer-card {
  flex: 1.22;
  min-width: 0;
}

.eyebrow,
.answer-label {
  color: #5cc8ff;
  font-size: 10px;
  letter-spacing: 1px;
}

.title {
  display: block;
  margin-top: 5px;
  color: #ffffff;
  font-size: 19px;
  line-height: 21px;
  font-weight: 700;
}

.prompt,
.answer-copy,
.answer-text {
  display: block;
  margin-top: 6px;
  color: rgba(230, 248, 255, 0.85);
  font-size: 10px;
  line-height: 14px;
}

.answer-text {
  color: #73ffd9;
  font-size: 15px;
  line-height: 18px;
  font-weight: 700;
}

.action-row {
  width: 88px;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ghost-button,
.primary-button {
  flex: 1;
  margin: 0;
  border-radius: 11px;
  font-size: 11px;
  line-height: 15px;
  padding: 5px 6px;
}

.ghost-button {
  color: #5cc8ff;
  border: 1px solid rgba(92, 200, 255, 0.45);
  background: rgba(12, 28, 44, 0.78);
}

.primary-button {
  color: #031219;
  background: linear-gradient(90deg, #69f7d6, #5cc8ff);
  border: none;
  font-weight: 700;
}
</style>
