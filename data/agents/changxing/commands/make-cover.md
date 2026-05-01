---
name: make-cover
description: Generate a social media cover image with title overlay. Supports Red Note, LinkedIn, X, Instagram, and any custom size. Smart mode: pass a markdown file to auto-design from article content.
argument-hint: '"<title>" --prompt "full design description" [--base path/to/image.png] [--ratio 3:4]'
allowed-tools: Bash, Read
---

# Cover Generator

Generates cover images using `gemini-3.1-flash-image-preview`. Claude crafts a full natural language `--prompt` describing the entire design — no need to piece together `--highlight`, `--theme`, `--sub` separately.

## How It Works — Art Direction First, Then Prompt

**生成 prompt 之前，先做艺术指导。** 像平面设计师一样思考，不是像工程师拼参数。

### Step 1: 艺术构思（Art Direction）

在写任何 prompt 之前，先想清楚并写下：

1. **视觉隐喻**：文章的核心情绪是什么？用什么视觉元素来表达？
   - 例：短视频兴衰 → 破碎的像素播放按钮（衰败感）
   - 例：AI 工具对比 → 天平、分裂的屏幕
   - 不要只是"放个相关 icon" — 要让图形讲故事

2. **排版节奏**：文字在画面中怎么呼吸？
   - 字体大小的对比关系（主标题 vs 副行的比例）
   - 文字放在画面的哪个区域？留白在哪里？
   - 文字和图形元素的空间关系
   - **颜色节奏（极其重要）**：画面从上到下的颜色变化必须形成抛物线——轻色→重色（高潮）→轻色→沉色。例：灰色小字→白色标题→绿色高亮（视觉高潮）→白色标题→灰色副标题→暖棕插图。如果去掉某个文字元素后，颜色节奏断裂（如高潮之后直接跳到空黑），必须用视觉替代物（分隔线、淡色装饰）补上过渡层。**副标题/小字的构图作用往往大于内容作用**——它们做的是颜色减速，不是信息补充。

3. **风格参考**：这张图像哪种艺术风格？
   - Bauhaus 海报？杂志封面？报纸头版？
   - 几何？手绘感？像素风？极简？
   - 色彩情绪：冷峻、温暖、高对比、低饱和

4. **构图**：视觉重心在哪？视线怎么流动？
   - 上方图形 → 中间标题 → 底部品牌信息？
   - 左重右轻？居中对称？
   - 负空间怎么用？

### Step 2: 设计 2-3 个排版方案，用 ASCII 草图展示

**禁止边想边改。** 必须先设计好多个方案，比较后选最优，再动手写 prompt。

每个方案用 ASCII 草图画出来，标注：
- 每个元素的位置（上/中/下，左对齐/居中）
- 大致的大小比例
- 留白区域
- 视线流动方向

然后对每个方案做一句话评价（优势和风险），推荐一个。

### Step 2.5: 以"世界上最好的设计师"视角审稿

在用户确认方案之前，切换到顶级设计师视角，对推荐方案提出批评。检查：

- **对齐一致性**：所有文字元素是否遵循同一套对齐规则？混搭居中和左对齐 = 设计事故
- **大小层次**：标题和副文字的比例是否达到 3:1？看起来像"大号和中号"就是失败，必须是"巨型和小号"
- **间距呼吸**：重复元素（如两个高亮条）之间的间距是否 ≥ 元素自身高度？贴在一起 = 一个色块
- **重心平衡**：内容是否挤在画面某个区域？上下留白比例是否合理（推荐上 40% 留白 → 内容 → 下 20% 留白）
- **装饰和标题的空间关系**：装饰元素是否离标题太近？需要有明确的呼吸空间

发现问题就修改方案，不要带着已知问题去生成。

### Step 3: 展示给用户确认

把最终方案（含 ASCII 草图 + 审稿修正）展示给用户，确认后再写 prompt。

### Step 4: 以艺术家 + prompt 专家的身份写 prompt

用户确认方案后，**切换到艺术总监视角**写 prompt。关键原则：

**装饰性元素必须描述到极致具体**，不能留给 Gemini 猜：
- 坏：`"a pixelated play button disintegrating"`
- 好：`"a 120×140px play button triangle made of 8×8px square blocks in #333 dark gray, positioned center-top at 20% from top edge. The upper-left 60% of blocks are intact and densely packed. The lower-right 40% has blocks separating — 15 individual blocks scattered downward with increasing spacing, the furthest block 80px below the main shape. Each scattered block rotated 5-15 degrees randomly. Total icon occupies about 15% of canvas area."`

**要描述的维度**：
- 精确位置（距离边缘百分比）
- 尺寸占比（占画面多少）
- 颜色值（用 hex 如 #C8C8C8，不要用 "gray"）
- 形状细节（圆角？直角？线条粗细？）
- 材质/纹理感（像素块大小、透明度）
- 空间关系（元素之间的间距）

**用分段结构组织 prompt**，每个视觉层独立描述：
```
DECORATIVE ELEMENT — [位置、尺寸、形状、颜色、细节]
TITLE — [位置、字体层次、高亮词、颜色]
BRAND — [位置、大小、颜色]
```

**视觉优先级铁律**：
1. **标题** = 绝对主角，占据最大视觉权重。装饰元素永远不能抢标题风头
2. **装饰元素** = 配角，烘托氛围。用浅色/小尺寸/低对比度压下去
3. **品牌信息** = 耳语级别。极小、极淡（light gray #BBBBBB）、几乎融入背景。logo 占画面 ≤2.5%，文字高度 ≤1.5% canvas

## Smart Article Mode

When the user passes a **markdown file path** (or a long block of markdown text):

1. **Read the article** — understand topic, tone, key points
2. **Infer platform from language**:
   - Chinese → 小红书长文封面 (`2:3`)
   - English → LinkedIn article cover (`16:9`)
   - User can override
3. **Art direction** — 像设计师一样构思，不是拼参数：
   - **视觉隐喻**: 文章核心情绪是什么？用什么图形/意象来传达？（例：破碎播放按钮 = 平台衰亡）
   - **Title**: Use the article's original title. Split into lines with size hierarchy
   - **排版构图**: 图形和文字的空间关系、留白、视线流动
   - **风格**: Bauhaus？杂志？像素？极简？色彩情绪？
   - **Highlight keywords（标题锚点）**: 高亮词是标题里的**视觉锚点** — 读者的眼睛先被锚定到高亮词，然后才去读完整标题。选词标准：看到这个词就想知道上下文是什么。好：`死于出售`、`险于不卖`（反直觉，读者会问"谁死了？为什么？"）。坏：`十三年`、`短视频`（只是主题词，看到了也不会好奇上下文）
   - **Brand**: `OpenOnion.AI` small in corner. Logo keeps original colors
4. **Show the full design plan** to user — 视觉隐喻、排版、风格、色彩都要写出来，get confirmation
5. Convert design into prompt → generate

## Platform Specs

| Platform | Ratio | Size |
|----------|-------|------|
| Red Note 小红书 普通封面 (default) | `3:4` | `2K` |
| Red Note 小红书 长文封面 | `2:3` | `2K` |
| Instagram Stories / TikTok | `9:16` | `2K` |
| Instagram Square | `1:1` | `2K` |
| X (Twitter) / LinkedIn | `16:9` | `2K` |

**Inference rules:**
- Chinese markdown file → `2:3`
- English markdown file → `16:9`
- Title string only → `3:4`
- Always tell user the inferred ratio, let them correct

## Script

```bash
python /Users/changxing/project/OnCourse/platform/one-person-company-skills/make-cover/scripts/make_cover.py \
  "<title>" \
  --prompt "<full design description crafted by Claude>" \
  --ratio 3:4 \
  --size 2K \
  [--base path/to/poster.png] \
  [--name "103-short-video-history"]
```

`--name`: Output filename base. Use the feed number + slug (e.g. `103-short-video-history`) or article title slug. If omitted, auto-derived from title text.

## Prompt Crafting Guidelines

When writing the `--prompt`, include all of these in natural language:
- Canvas orientation and ratio (e.g., "2:3 vertical")
- Background description (color, style, mood — keep minimal so title dominates)
- **Title with size hierarchy**: main line VERY LARGE, secondary line noticeably smaller. Exact text in quotes
- **Keyword highlights（锚点）**: 高亮词 = 标题的视觉锚点，读者先看到这个词再读全句。选能引发"然后呢？"反应的词（green = brand accent color）
- Decorative accents (faint, corners only — don't compete with title)
- `OpenOnion.AI` as small brand watermark in corner
- "Place the provided logo image small in the bottom-right corner" — **keep logo original colors, do NOT recolor**
- Typography: "Bold heavy sans-serif, maximum contrast, sharp edges"
- **Always add**: "CRITICAL: render the title ONCE only, do NOT repeat or duplicate any text"

## Known Gemini Quirks

- **Text duplication**: Gemini often renders the same title text 2-3 times. Always include "do NOT repeat any text" and "render only ONCE" in the prompt
- **White background + Chinese**: Large Chinese text on white backgrounds frequently causes ghosting/duplication. **Black backgrounds render Chinese text much more reliably** — prefer dark backgrounds unless user specifically wants white
- **Word splitting**: English words like "TikTok" sometimes get split ("Ti kTok"). Spell out in prompt that these are single words

## Workflow

### Article mode:
1. Read article → understand tone and core emotion
2. **Art direction**: visual metaphor, layout, style, composition
3. **Design 2-3 排版方案**（ASCII 草图），评价各方案优劣，推荐一个
4. **自我审稿**：以顶级设计师视角审查推荐方案，修正问题
5. Show to user → confirm → write prompt → generate → review (up to 3 rounds)

### Title only:
1. Confirm ratio
2. **Art direction + 排版方案**（ASCII 草图）
3. **自我审稿** → show to user → confirm → generate → review (up to 3 rounds)

### Quality check:
- **No text duplication** — every line appears exactly once
- **对齐一致性** — 所有文字元素遵循同一套对齐规则（全左对齐或全居中，不混搭）
- **大小层次 ≥ 3:1** — 标题字号是副文字的 3 倍以上。"大号和中号" = 失败
- **间距呼吸** — 重复元素（高亮条等）之间间距 ≥ 元素自身高度
- **重心平衡** — 内容不挤在一个区域，上下留白合理
- **颜色节奏** — 从上到下的颜色是否形成抛物线（轻→重→轻→沉）？高潮色（如绿色高亮）之后是否有减速过渡？如果标题区直接跳到插图区中间没有任何过渡元素（副标题、分隔线、淡色装饰），颜色节奏断裂 = 设计事故
- **去掉元素前检查构图影响** — 用户要求去掉副标题/文字时，先检查该元素是否承担构图功能（颜色过渡、视觉减速）。如果是，必须用视觉替代物（分隔线+淡色装饰图标）补上，不能直接删除留空
- **文字不能撑满边缘** — 左右留白 ≥ 10%。文字贴边 = 拥挤感。用户反馈"太拥挤"时首先检查边距
- **装饰元素** — 淡、小、不抢标题，且与标题有明确间距
- 高亮锚点完整覆盖目标词
- Logo 原色，品牌极小
- Below 8/10 → re-run with adjusted prompt
