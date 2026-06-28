# /superlearning

[English](README.md) | **한국어**

**누구에게든 무엇이든 진짜 머릿속에 남도록 가르칩니다 - 오감을 통해, 한 입 크기로, 배울수록 자라나는 보상 마을과 함께.**
별도 설치는 없습니다. 저장소를 클론하고 스킬 디렉터리에 심링크한 뒤 `/superlearning <주제>`.
랜딩 페이지: **[cskwork.github.io/superlearning-skill](https://cskwork.github.io/superlearning-skill/)**.

진짜로 기억에 남는 학습을 위한 agent 스킬입니다. 사람은 보는 것이 아니라 *만드는* 것을 기억합니다. 그래서 모든 한 입(bite)은 감각으로 직접 만들어낼 거리 하나를 건넵니다 - 그려보고, 노래하고, 연기하고, 몸으로 움직이고, 웃어넘기는 것. 그리고 그 한 입을 끝내면 작은 아이소메트릭 마을이 자라나는데, 이 마을은 그대로 기억의 궁전(memory palace)이 됩니다. 이 스킬은 의도적으로 재미를 가장 앞에 둡니다. 재미야말로 내일 다시 돌아오게 만드는 힘이니까요. 하지만 아무것도 가르치지 못하는 재미는 그저 놀이일 뿐이라, 절대 굽히지 않는 규칙 하나가 붙어 있습니다: 모든 한 입은 여전히 평이한 정의, 진짜 worked example, 그리고 자기 말로 다시 설명하기를 담습니다. 한 줄짜리 사실만 듣고 싶다면, 스킬을 건너뛰고 평이하게 답하세요.

## 일반 챗봇보다 더해지는 것

일반 챗봇은 당신에게 설명을 쏟아붓고, 고개만 끄덕이게 두고는, 다 배웠다고 칩니다 - 안다는 따뜻한 착각만 남기고, 정작 내일 다시 만들어낼 수 있는 것은 아무것도 남기지 않은 채로. `/superlearning`은 챗봇이 거저 해주지 않는 다섯 가지를 더합니다:

- **만들어라, 보지만 말고 (대표 원칙).** 모든 한 입은 당신이 직접 만들어내는 감각 활동 하나를 건넵니다 - 스케치, 노랫말, "만약에...?" 장면, 인출 반복(recall reps), POW! 펀치라인 - 보기만 하는 클립이나 완성된 다이어그램을 멍하니 보는 것이 아니라. 사람은 받아들인 것이 아니라 생성한 것을 기억하며, gate는 수동적으로 소비한 활동을 거부합니다.
- **보상은 노력으로 얻어내며, 그 자체가 기억의 궁전이 됩니다.** 인출 점검을 통과하며 한 입을 끝내면 블록 하나를 얻고, 블록은 다섯 단계(plot -> room -> house -> village -> city)를 거쳐 아이소메트릭 마을을 짓습니다 - 빌드도 의존성도 없는 `templates/world/world.html`이 그려냅니다. 각 건물에는 그것이 상징하는 개념이 태그로 붙어 있어, 당신이 지은 마을이 배운 것을 떠올리는 공간 단서가 됩니다 - 보상인 동시에 복습 지도.
- **never-vague 핵심.** 재미는 절대 변하지 않는 핵심을 감쌀 뿐입니다: 전문 용어 없는 정의, 구체적이고 REAL한 worked example 하나(손짓 같은 비유가 아니라 풀어낸 사례), 그리고 자기 말로 다시 말하게 하는 프롬프트. 이 중 하나라도 빠지면 그 한 입은 학습이 아니라 장식이며, gate가 떨어뜨립니다.
- **가짜 진척은 없습니다.** 보상 시스템은 스스로에게 트로피를 쥐여줄 수 있는 순간 죽습니다. 그래서 coach는 자기 블록을 절대 스스로 수여하지 않고, 자기 숙달을 스스로 찍지 않습니다. 독립적인 **engagement-critic**이 결정적 gate를 실행하며, 개념을 mastered로, 블록을 earned로 표시할 수 있는 유일한 역할입니다. 날조된 진척이야말로 이 gate가 막는 대상입니다.
- **절대 날조 금지.** 사실로 진술된 것 - 숫자, 날짜, 이름이 붙은 연구 - 은 실제 URL과 함께 `facts.json`에 출처를 달거나 잘라냅니다. 검증할 수 없는 항목은 문서화된 placeholder가 되며, 지어낸 사실, 인용, 날짜가 되지 않습니다.

재미는 당신을 머물게 하는 포장지이고, never-vague 핵심과 노력으로만 얻는 보상이 그것을 머릿속에 남게 합니다.

## 모드

가르치기 전에 모드를 한 줄로 밝히세요. 예: `JOKE - binary search의 midpoint-overflow 함정; channel humor; bite 4`. 루트 `SKILL.md`는 라우터이며, 각 모드는 필요한 reference만 로드합니다. 다섯 채널은 학습자가 직접 MAKE하는 것이고, 두 제어 모드는 기본 레슨과 보상 마을을 움직입니다.

| 요청 속 신호 | 모드 | 한 줄 용례 |
|---|---|---|
| "그려줘", "다이어그램", 또는 공간적/구조적 콘텐츠(트리, 회로) | **DRAW** (visual) | 구조나 흐름을 직접 손으로 스케치 - 상자, 화살표, 라벨 붙은 그림; 읽기보다 그리기가 더 남습니다 |
| "노래 만들어줘", "가사", "Lyria", 또는 목록형/순차적 콘텐츠 | **COMPOSE** (auditory) | 개념을 담은 가사를 함께 쓰고, 트랙을 생성할 바로 붙여넣는 Google Lyria 프롬프트까지 |
| "만약에", "이야기로", "역할극", 또는 인과적/선택 중심 콘텐츠 | **ROLEPLAY** (narrative) | 개념이 규칙이 되는 "만약에...?" 세계, 그리고 그것을 써서 이겨야 하는 주인공인 당신 |
| "가만히 못 있겠어", "움직이자", 또는 반복 암기형 콘텐츠 | **MOVE** (kinesthetic) | 음악에 맞춰 push-up / sit-up / jumping jack에 묶은 인출 반복 - 한 번 동작에 한 항목 인출 |
| "웃기게", "농담", "말장난", 또는 헷갈리기 쉬운 끈적한 포인트 | **JOKE** (humor) | 메커니즘을 이해해야만 터지는 POW! 펀치라인을 당신이 직접 완성 |
| "X 가르쳐줘", 채널 미지정(기본) | **BITESIZE-LEARN** | 콘텐츠에 맞는 채널을 고르고, 한 입마다 바꿔가며, 작은 한 입을 끝까지 가르친 뒤 보상 |
| "내 마을 보여줘", "나 어떻게 하고 있어", 세션 끝 | **WORLD / REWARD-CHECK** | 독립 critic이 gate를 실행해 실제로 얻은 블록을 인증하고, 마을이 자랍니다 |

타이브레이크: 명시된 채널이 기본을 이깁니다("노래로 해줘" -> "가르쳐줘" 안에서도 COMPOSE); 채널 미지정 -> BITESIZE-LEARN이 콘텐츠와 다양성으로 고릅니다(직전 감각을 반복하지 않음); 새 학습 없이 "내 세계 지어줘" -> WORLD 렌더만.

> 여기서 multi-sensory는 학습 "스타일 맞추기"가 아니라 multi-channel *encoding*입니다 - 같은 개념으로 돌아가는 독립적인 단서를 더 많이 만드는 것. 자기가 말한 스타일에 맞춘 교수법은 좋은 근거가 없으므로, 채널은 당신에게 붙은 라벨이 아니라 콘텐츠가 필요로 하는 것과 다양성으로 고릅니다.

## 기본 learn loop (역할 분리)

**learning-coach**가 한 입을 가르치고, 활동을 정하고, 만들고-채점하는 루프를 인라인으로 돌립니다 - 당신이 만들고 자기 말로 되돌려 말하는 것이 라이브 검증자라서, 한 입마다 따로 두는 리뷰어가 없습니다. **researcher**는 한 입이 사실을 진술할 때만 출처를 댑니다. 독립적이고 신선한 컨텍스트의 **engagement-critic**은 보상 경계에서 gate를 실행합니다 - 진척을 날조할 수 있는 순간 보상 시스템은 죽기 때문입니다. builder는 자기 블록을 절대 스스로 수여하지 않습니다.

작업은 **vault** = 학습자+주제당 하나의 디렉터리 `.superlearning/<topic>/`에 담기며, 여기에는 `session-claims.json`(한 입마다: 개념, 정의, 전문 용어, worked example, 재진술 프롬프트, 채점, 감각 활동), `facts.json`(출처가 달린 사실, `[]`일 수 있음), `progress-state.json`(xp, streak, 숙달한 개념, 마을의 블록과 tier, 복습 일정), 그리고 `material/*.html`(활동 카드)과 `world/world.html`(보상 마을)이 들어갑니다. **vault 없으면 gate 없고, 정직한 마을도 없습니다** - 1단계에서 만드세요.

1. **Frame** (coach). 한 줄로 한 모드를 분류합니다. vault를 만들거나 찾습니다.
2. **Diagnose** (coach). 가볍고 장난스러운 선행 지식 탐색. 다음 작은 한 입과, 그에 맞으면서 직전에 쓰지 않은 채널을 고릅니다.
3. **Source** (researcher; 한 입이 외부 사실을 진술할 때만). URL과 함께 `facts.json`에 검증합니다. 검증 불가 -> 문서화된 placeholder, 지어낸 사실은 절대 금지. 순수 추론 한 입이면 건너뜁니다.
4. **Teach the bite** (coach). 정의 + worked example을 전달하고, 학습자가 직접 MAKE하는 감각 활동 하나를 붙입니다. 기본적으로 `material/activity-NN.html` 카드로 렌더링하고, 재진술 프롬프트와 채점은 터미널에 둡니다.
5. **Produce + grade** (coach). 학습자가 산출물을 만들고 자기 말로 개념을 되돌려 말합니다. 6유형 루브릭으로 FIRST 빈틈을 짚고, 친절한 후속 질문을 정확히 하나 돌려주며, 진짜 진전을 응원합니다. 빈틈이 없어질 때까지 한 입 안에서 반복합니다.
6. **Reward-check** (engagement-critic, 독립 - 세션/마을 경계에서). critic이 vault를 다시 읽고 gate를 실행하며, 모든 위반을 `file:locator`로 열거합니다. 블록을 `earned`로, 개념을 `mastered`로 표시할 수 있는 유일한 역할입니다. 보상 사이의 라이브 한 입은 이 단계를 건너뜁니다.
7. **Grow the town + schedule** (coach, gate가 green이 된 뒤). 얻은 블록을 더하고, xp/streak를 올리고, 임계치를 넘으면 tier를 올리고, `world/world.html`을 다시 렌더링합니다. 분산 인출(1일 / 1주 / 1개월)을 예약합니다. 놓치면 DIFFERENT 채널로 다시 가르칩니다.

역할 -> 페르소나: 가르치기 = `agents/learning-coach.md`, gate/보상 = `agents/engagement-critic.md`, 출처 = `agents/researcher.md`.

## Quickstart

```text
/superlearning teach me how recursion works with all five senses
/superlearning make studying the Krebs cycle fun
/superlearning sing me a song to remember the cranial nerves
/superlearning act out how a binary search finds a number
/superlearning do push-ups while I memorize the planets
/superlearning show my town
```

## gate

인증 검사는 결정적이며, coach는 자기 작업에 대해 이를 실행할 수 없습니다 - engagement-critic만 실행합니다:

```bash
node templates/engagement-gate.mjs .superlearning/<topic>
```

보상 경계에서만 실행되고, 라이브 한 입마다 실행되지는 않습니다. vault 제어 파일을 읽고 - 절대 추측하지 않음 - 다섯 개의 하위 gate를 순서대로 실행합니다. 하나라도 FAIL이면 전체 FAIL이며, 그대로 표시되는 `file:locator` 위반으로 출력됩니다:

1. **never-vague** (붙박이 핵심). 각 개념은 비어 있지 않은 전문 용어 없는 `definition`, 구체적인 `workedExample`(비어 있지 않고, 비유만이 아니며, 정의를 다시 진술한 것이 아님), `restatementPrompt`, `factual` 플래그를 가집니다; 선언한 전문 용어는 모두 풀어 씁니다.
2. **active-engagement** (대표). 각 활동은 유효한 `channel`(`visual|auditory|narrative|kinesthetic|humor`), `produced:true`(학습자가 만듦), 비어 있지 않은 `retrievalRole`을 선언합니다; 수동적 소비와 학습 스타일 표현은 FAIL.
3. **bitesize**. 한 입에 작은 개념 하나(새 전문 용어 최대 4개); 각 채점은 하나의 `gapType`와 정확히 하나의 후속 질문을 담습니다.
4. **reward-integrity**. 모든 `earned:true` 블록은 실제로 가르치고 AND 인출을 통과해 mastered된 개념에 연결됩니다; 다시 가르칠 때는 다른 채널을 씁니다. 날조된 진척 없음.
5. **integrity**. 모든 `factual:true` 주장은 비어 있지 않은 URL을 가진 `facts.json` 출처로 연결됩니다.

보상 마을(`world/world.html`)은 같은 실행에서 구조적으로 검사됩니다(`world.css`/`world.js` 로드, `.world-stage`와 읽을 수 있는 `.world-summary` 보유). 레슨을 통과시키려고 gate를 절대 약화하지 마세요 - 레슨을 고치세요.

## 운영 규칙

- **만들어라, 보지만 말고.** 모든 한 입은 감각으로 만들어낼 산출물 하나를 건넵니다; 수동적 소비는 인정되지 않고 gate가 거부합니다.
- **절대 모호하지 않게.** 모든 한 입은 여전히 전문 용어 없는 정의, 구체적인 실제 worked example(비유만으로는 안 됨), 자기 말 되돌리기를 내놓습니다.
- **보상은 얻어내야 합니다.** 블록에는 통과한 인출이 필요합니다; coach는 자기 블록을 수여하거나 자기 숙달을 찍지 않습니다 - 오직 독립 critic만 합니다.
- **감각을 섞되, 학습자를 유형화하지 마세요.** 세션 내내 채널을 바꿔 인코딩 단서를 늘립니다. 이는 학습 스타일 맞추기가 아니라 multi-channel encoding입니다(스타일 맞추기는 근거 없음); gate는 "당신은 시각 학습자니까"를 FAIL시킵니다.
- **다른 감각으로 다시 가르치기.** 놓친 개념은 DIFFERENT 채널로 돌아옵니다 - 노래 대신 그림으로 - 방금 실패한 그 채널로는 절대 안 됩니다.
- **한 입 크기, 한 번에 한 개념.** 작업 기억은 약 네 가지를 담습니다; 더 큰 것은 끝낼 수 있는 조각으로 쪼개세요.
- **절대 날조 금지.** 진술한 사실은 모두 `facts.json`에 출처를 달거나 잘라내세요; 출처가 없으면 문서화된 placeholder가 되며, 지어낸 사실, 인용, 날짜가 되지 않습니다.
- **역할 분리.** Coach != critic; builder는 자기 gate를 절대 실행하지 않습니다.
- **출력 규율.** 산문은 학습자의 언어로; identifier, 파일 경로, 명령, JSON 키는 표준 영어로 유지하세요. 이모지 금지; HTML이면 WCAG AA 대비; gate의 명령 출력과 함께 리포트.

## 설치

이 저장소가 곧 스킬입니다. 사용하는 agent CLI가 스킬을 찾는 위치에 두세요:

```bash
git clone https://github.com/cskwork/superlearning-skill.git
cd superlearning-skill
SRC="$(pwd)"
mkdir -p ~/.claude/skills ~/.agents/skills ~/.codex/skills

# One canonical checkout, symlinked into each active agent.
# If a target exists, audit it first and preserve any local edits before replacing it.
ln -s "$SRC" ~/.claude/skills/superlearning
ln -s "$SRC" ~/.agents/skills/superlearning
ln -s "$SRC" ~/.codex/skills/superlearning

# Canonical repo verification:
bash tests/run-all.sh
```

이후 사용하는 agent CLI에서: `/superlearning <당신의 주제>`.

### Windows

스킬은 Windows에서 동작합니다. 다만 gate와 test 스크립트는 `node`와 POSIX 셸을 쓰므로 **Git Bash** 또는 **WSL**에서 실행하세요(`node`가 `PATH`에 있어야 합니다). 저장소는 `.gitattributes eol=lf`로 줄바꿈을 고정합니다. 심링크에 관리자 권한이 필요하면 **복사**로 설치하세요(Git Bash/WSL의 `cp -R`, 또는 관리자 `cmd`의 `mklink /D`). 그다음 컨트랙트 테스트는 WSL bash에서 실행하세요.

## 레이아웃

```
SKILL.md            얇은 라우터: never-vague 핵심, 5개 채널 + 2개 제어 모드, 역할 분리 루프, gate
agents/             역할별 페르소나 하나씩: learning-coach.md (builder) - engagement-critic.md (독립 gate) - researcher.md (사실)
reference/          learning-core.md (상시 권위) - draw.md - compose.md - roleplay.md - move.md - joke.md - bitesize-reward.md - world-progress.md - workspace.md - sources.md
templates/          engagement-gate.mjs (결정적 gate) - skill-frontmatter-gate.mjs - workspace/ (제어 파일 예시) - world/ (아이소메트릭 보상 마을) - teach/assets/ (HTML 활동 카드 scaffold)
tests/              컨트랙트 테스트 + fixtures/ (pass-vault, fail-vault) + run-all.sh 표준 검증기
docs/               index.html 랜딩 페이지 + .nojekyll
```

vault `.superlearning/<topic>/`는 학습자+주제당 런타임에 생성되며, git-ignore되어 커밋되지 않습니다.

## 라이선스

MIT. [`LICENSE`](LICENSE) 참고.
