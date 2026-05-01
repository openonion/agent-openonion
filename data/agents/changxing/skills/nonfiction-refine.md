---
allowed-tools: Read, Skill, TaskCreate, TaskUpdate, TaskList, TaskGet
description: 非虚构写作优化流程·编排器（调度其他 skill）(user)
argument-hint: <文章路径>
---

# 非虚构写作优化流程（编排器）

你**不直接修文章**。你按顺序调度其他 skill 完成完整的优化流程，每一步都用 todo 跟踪进度。

**参数**：$ARGUMENTS

---

## 编排逻辑

非虚构优化分**规划层 + 修改四层**——**大纲错了改章节白搭，结构错了改深度白搭，深度不够加场景没用，场景没立先打磨语言更没用**：

| 顺序 | Skill | 作用 | 何时跑 |
|------|-------|------|--------|
| 起点 | `reader-feel` | AI 创业者+作家视角批评，7 局部+整体长评 | 必跑 |
| 0 | `outline-plan` | 规划：章节字数比例、主角桥、高潮位置、删/扩清单，写到 `.outline.md` | **结构性痛点 ≥2 时跑** |
| 1 | `nonfiction-structure` | 骨架：按 outline 执行章节切分、桥句、删减 | 结构性痛点触发 |
| 2 | `nonfiction-depth` | 思想：推演、多视角、因果、条件分析 | 深度痛点触发 |
| 3 | `nonfiction-scene` | 文学：场景、白描、人名注释、时代感 | 场景痛点触发 |
| 4 | `ai-language-fix` | 语言：破折号、设问句、AI 特征 | 永远跑 |
| 5 | `wenbai-jiehe` | 文白结合·节奏：白话句子重塑节奏、4 字收尾、文言点缀 | 永远跑 |
| 终点 | `reader-feel` | 验证起点痛点是否修掉 | 必跑 |

**核心规则（防 stop bug）**：起点 reader-feel 输出后**立即按跳步规则自动路由进下一步**，**不等用户**。只有终点 reader-feel 输出后才把决策交回用户。reader-feel 内嵌的「等用户决定」是为直调场景写的，编排器调用时该规则失效。

---

## 第零步：选写作灵魂

**先 Read `writer-souls.md`**，根据文章类型选择主导灵魂（吴晓波/阿城/Talese/Didion/王小波/McPhee）。在调用每个 sub-skill 之前，把灵魂选择写进调用 args 让 sub-skill 知道。

---

## 工作流程

### 1. 建 todo 清单

用 TaskCreate 建 8 个任务（按顺序）：

1. `reader-feel 起点诊断` — activeForm: "读者起点诊断"
2. `outline-plan 规划大纲` — activeForm: "规划大纲"
3. `nonfiction-structure 修结构` — activeForm: "改结构"
4. `nonfiction-depth 修深度` — activeForm: "挖深度"
5. `nonfiction-scene 修场景` — activeForm: "补场景"
6. `ai-language-fix 打磨语言` — activeForm: "清语言"
7. `wenbai-jiehe 文白结合` — activeForm: "文白结合"
8. `reader-feel 终点验证` — activeForm: "读者终点验证"

每开始一项 TaskUpdate 为 `in_progress`，完成后 `completed`。

### 2. 起点诊断（必跑）

调用 `Skill(skill="reader-feel", args="<文章路径>")`。

读者输出 7 个局部痛点 + 整体长评。**把痛点列表存下来**，作为后续跳步规则的依据。

**输出后立即进入第 3 步路由判断**，不停顿、不等用户确认。

### 3. 跳步规则（根据起点痛点决定）

| 痛点类型 | 路由到 |
|---------|--------|
| 标题骗 / 开头不钩 / 跑题 / 章节膨胀 / 时间跳跃 / 主角换没桥 / 高潮单一 / 标题正文比例反 / 创业百科赘述 | `outline-plan` → `nonfiction-structure` |
| 决策跳过推演 / 看了等于没看 / 结尾空 / 收尾空 / 一句道理收 / 段落孤岛 | `nonfiction-depth` |
| 没看懂（人名没括号）/ 人物没脸 / 场景假货 / 空洞分析 | `nonfiction-scene` |
| 读不下去（句子怪、AI 腔）| `ai-language-fix` |

**规则**：
- **结构性痛点 ≥2 时**：先跑 `outline-plan` 写 `.outline.md`，再跑 `nonfiction-structure` 按 outline 执行
- **结构性痛点 ≤1 时**：跳过 `outline-plan`，直接跑 `nonfiction-structure`
- **没有结构性痛点**：把 `outline-plan` 和 `nonfiction-structure` 两个 task 都 `deleted`
- 起点痛点没有指向某层 → 把那个 task 设为 `deleted`
- `ai-language-fix` 和 `wenbai-jiehe` **永远跑**，顺序：先 ai-language-fix 后 wenbai-jiehe
- `reader-feel` **永远跑两次**，起点+终点

### 4. 依次调用 sub-skill

每次只调一个 skill，等它跑完再调下一个：

```
# outline-plan（条件触发，结构性痛点 ≥2 时）
TaskUpdate(2, status="in_progress")
Skill(skill="outline-plan", args="<path>，灵魂=X，起点痛点=[...]")
↓ outline-plan 写 .outline.md，更新 frontmatter outline: 指针
TaskUpdate(2, status="completed")

# structure（按 .outline.md 执行）
TaskUpdate(3, status="in_progress")
Skill(skill="nonfiction-structure", args="<path>")
↓ structure 先 Read 同名 .outline.md（如有），按 outline 执行；无 outline 时自己诊断
TaskUpdate(3, status="completed")

# depth / scene / ai-language-fix / wenbai-jiehe
...
```

**禁止并行调用**——每个 sub-skill 都会写文件，并行会冲突。

**禁止跳过 outline-plan**：当结构性痛点 ≥2 时，没有 outline 直接跑 structure 等于让 structure 自己拍脑袋决定章节切分，容易越改越乱。

### 5. 终点验证（必跑）

最后再调 `Skill(skill="reader-feel", args="<文章路径>")`。

把新的 7 痛点 vs 起点 7 痛点对比：

- 起点痛点全部消失 → 完工
- 起点有 ≥2 个痛点还在 → 报告给用户哪几个没修干净，**让用户决定**回哪个 sub-skill 重跑（不要自动重跑）
- 出现起点没有的新痛点 → 修复过程中引入了新问题，标记并报告

---

## 输出格式

每一步简要报告（一行）：

```
✓ reader-feel 起点：标题骗 / 开头不钩 / 章节膨胀 / 结尾空 / 人名过多 / 跑题 / AI 语言
✓ nonfiction-structure：拆 §5 为 3 段 + 重写 prelude
✓ nonfiction-depth：补 Cuban 闭环 + Universal 翻转条件
✓ nonfiction-scene：5 处人名加注 + 删 1 处电影画面
✓ ai-language-fix：消除 12 处破折号 / 4 处设问句
✓ reader-feel 终点：起点 7 痛点 → 修掉 6 / 1 仍存（标题与正文比例）
```

最终输出：起点 vs 终点的痛点 diff + 是否需要继续。

---

## 禁止

- ❌ **直接 Edit 文章**——你是编排器，改文件的活交给 sub-skill
- ❌ **跳过 todo 跟踪**——每一步都要 TaskUpdate，让用户看见进度
- ❌ **并行调 sub-skill**——文件冲突，写覆盖
- ❌ **把 sub-skill 的完整诊断都复述一遍**——一行 summary 即可
- ❌ **跳过终点 reader-feel**——没验证 = 没改完
- ❌ **自动重跑没修干净的步骤**——交回用户决定，避免无限循环

---

## 旁置文件

| 文件 | 用途 |
|------|------|
| `writer-souls.md` | 写作灵魂（第零步读） |
| `research-guide.md` | 调研方法（如需直接参考） |
| `writing-examples.md` | 好/坏对照（如需直接参考） |

`research-guide.md` 和 `writing-examples.md` 在 sub-skill 各自的目录里也有版本，sub-skill 自己读自己的，编排器不必读。

---

## 使用方法

```
/nonfiction-refine <文章路径>
```

如果只想跑某一层而不走全流程，**直接调对应 skill** 即可，不需要走编排器：

- 只看读者感觉 → `/reader-feel`
- 只规划大纲 → `/outline-plan`（产出 `.outline.md`，不动正文）
- 只改结构 → `/nonfiction-structure`（如有 `.outline.md` 会按它执行）
- 只挖深度 → `/nonfiction-depth`
- 只补场景 → `/nonfiction-scene`
- 只清语言 → `/ai-language-fix`
- 只做文白结合 → `/wenbai-jiehe`

编排器是"全套体检 + 修复"的入口。
