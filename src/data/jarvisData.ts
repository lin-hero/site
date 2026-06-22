import {
  Brain, Cpu, Terminal, Lock, Search, Database, Globe, Play, CheckCircle2,
  List, FileText, Folder, Wrench, Shield, Zap, Power, Camera, Volume2, Sun,
  Activity, MessageSquare, Key, Info, Settings, Mic, AudioLines, CircleDashed, Circle
} from 'lucide-react';

export const WIN_SCRIPT_TPL = `You are a PowerShell automation specialist building scripts for JARVIS NEXUS.

Write a complete, self-contained .ps1 script that:
- Runs silently with zero user prompts or confirmation dialogs
- Performs the following task: [DESCRIBE YOUR TASK HERE]
- Uses only built-in Windows / PowerShell capabilities — no external installs
- Handles errors gracefully without halting execution

OUTPUT RULES (strictly enforced):
- Return ONLY raw .ps1 code — no markdown, no commentary, no explanations
- Skip any -RunAsAdministrator flags unless the task explicitly requires elevation
- First comment line format: # JARVIS Scenario — [scenario name]

─────────────────────────────────────────────────
HOW TO USE:
1. Fill in [DESCRIBE YOUR TASK HERE] with what you want done
2. Paste this entire prompt to any AI you like
3. Save the generated file inside your JARVIS Run Directory
4. Name it whatever you want to call it by voice
   e.g. "party mode.ps1" → say "Jarvis, run party mode scenario"
─────────────────────────────────────────────────`;

export const LIN_SCRIPT_TPL = `You are a Bash automation specialist building scripts for JARVIS NEXUS.

Write a complete, self-contained .sh script that:
- Starts with #!/bin/bash
- Runs silently with zero user prompts or interactive dialogs
- Performs the following task: [DESCRIBE YOUR TASK HERE]
- Uses only standard Unix utilities — no apt, pip, or curl installs
- Exits with code 0 on success, code 1 on failure

OUTPUT RULES (strictly enforced):
- Return ONLY raw bash code — no markdown, no commentary, no explanations
- Add set -e after the shebang for clean error propagation
- Second line format: # JARVIS Scenario — [scenario name]

─────────────────────────────────────────────────
HOW TO USE:
1. Fill in [DESCRIBE YOUR TASK HERE] with what you want done
2. Paste this entire prompt to any AI you like
3. Save the generated .sh file inside your JARVIS Run Directory
4. Name it whatever you want to call it by voice
   e.g. "night mode.sh" → say "Jarvis, run night mode scenario"
─────────────────────────────────────────────────`;

export const PERSONA_TPL = `Build a JARVIS NEXUS persona prompt from these inputs:

Vibe / Theme: [e.g. cold analyst / chaotic gremlin / hype man / wise mentor]
Tone: [e.g. clinical / enthusiastic / deadpan / poetic]
Speech style: [e.g. short punchy lines / elaborate breakdowns / street slang / formal prose]
Address the user as: [e.g. Boss / Commander / Chief / Operator]
Signature quirk: [e.g. always ends with a question / never uses filler words]

REQUIRED OUTPUT FORMAT — return exactly this block and nothing else:
IDENTITY: [1 sentence defining this AI character and what it is NOT]
TONE & BEHAVIOR: [1-2 sentences on personality traits and conduct rules]
RESPONSE STYLE: [2 sentences on vocabulary, how it addresses the user, and unique patterns]
STRICT ANTI-PATTERNS: [1 sentence on what this persona must never do]

YOUR HARD CONSTRAINTS:
- Do NOT write any real names or usernames anywhere inside the output
- Refer to the end-user ONLY with the address word specified above, never their actual name
- Total output must stay under 580 characters
- Make it feel genuinely alive — not a template fill-in`;

export const CAT_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  all:      { label: 'All Tools', color: 'text-white',       bg: 'bg-white/10',          border: 'border-white/20' },
  memory:   { label: 'Memory',    color: 'text-amber-400',   bg: 'bg-amber-400/10',      border: 'border-amber-400/20' },
  web:      { label: 'Web',       color: 'text-blue-400',    bg: 'bg-blue-400/10',       border: 'border-blue-400/20' },
  tasks:    { label: 'Tasks',     color: 'text-purple-400',  bg: 'bg-purple-400/10',     border: 'border-purple-400/20' },
  files:    { label: 'Files',     color: 'text-emerald-400', bg: 'bg-emerald-400/10',    border: 'border-emerald-400/20' },
  os:       { label: 'OS',        color: 'text-rose-400',    bg: 'bg-rose-400/10',       border: 'border-rose-400/20' },
  hardware: { label: 'Hardware',  color: 'text-cyan-400',    bg: 'bg-cyan-400/10',       border: 'border-cyan-400/20' },
  system:   { label: 'System',    color: 'text-slate-400',   bg: 'bg-slate-400/10',      border: 'border-slate-400/20' },
  internal: { label: 'Internal',  color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10',    border: 'border-fuchsia-400/20' },
};

export const TOOL_DATA = [
  // Memory
  { cat: 'memory',   icon: Search,      name: 'search memory',          say: '"When is my brother\'s birthday?" / "What did I buy last week?"',              desc: 'Digs through your personal long-term database for stored facts, preferences, and past conversations.',
    examples: [{tag: 'query', text: '"When is my brother\'s birthday?"'}, {tag: 'context', text: '"What did we discuss yesterday?"'}] },
  { cat: 'memory',   icon: Database,    name: 'save to memory',         say: '"Remember I prefer my coffee with no sugar"',        desc: 'Stores any fact, preference, or event permanently in your local memory. You own every byte.',
    examples: [{tag: 'fact', text: '"Save my passport number"'}, {tag: 'preference', text: '"Remember I hate waking up early"'}] },
  
  // Web
  { cat: 'web',      icon: Globe,       name: 'search web',             say: '"What is the weather in Alexandria today?"',                       desc: 'Silently fetches real-time web data for JARVIS to analyze and summarize — invisible to the browser.',
    examples: [{tag: 'search', text: '"What is the current gold price in Egypt?"'}] },
  { cat: 'web',      icon: Search,      name: 'open google search',     say: '"Show me pictures of vintage cars"',                         desc: 'Opens visual Google results in your browser. Best for images, products, and anything you want to see.',
    examples: [{tag: 'images', text: '"Show me pictures of vintage cars"'}, {tag: 'shop', text: '"Google search running shoes"'}] },
  { cat: 'web',      icon: Globe,       name: 'open website',           say: '"Open YouTube" / "Go to Wikipedia"',                 desc: 'Navigates to any URL or platform by name. JARVIS resolves the link — you don\'t need to know the URL.',
    examples: [{tag: 'open', text: '"Open Netflix"'}, {tag: 'navigate', text: '"Go to Amazon"'}] },
  { cat: 'web',      icon: Play,        name: 'youtube action',         say: '"Play a random pop song" / "Search for recipes"',          desc: 'Directly plays or searches YouTube. Defaults to play — say "search" only when you want the results page.',
    examples: [{tag: 'play', text: '"Play some relaxing music"'}, {tag: 'search', text: '"Search YouTube for funny cat videos"'}] },
  { cat: 'web',      icon: Brain,       name: 'deep research',          say: '"Deep research the history of the pyramids"',               desc: 'Multi-page web crawling with content extraction. Auto-saves findings to memory. Don\'t call save to memory after.',
    examples: [{tag: 'research', text: '"Deep research the benefits of green tea"'}] },
  
  // Tasks
  { cat: 'tasks',    icon: CheckCircle2, name: 'manage tasks',          say: '"Remind me to call mom at 5 PM" / "List my groceries"', desc: 'Creates, lists, completes, or deletes tasks and reminders. Supports relative time ("after 30 min") and absolute time ("at 5 PM").',
    examples: [{tag: 'add', text: '"Create a task to buy milk"'}, {tag: 'complete', text: '"Mark the laundry task as complete"'}, {tag: 'list', text: '"List all my pending tasks"'}, {tag: 'delete', text: '"Delete the meeting reminder"'}] },
  
  // Files
  { cat: 'files',    icon: List,        name: 'list directory',         say: '"What\'s in my downloads folder?" / "Show me the desktop"', desc: 'Lists all files and folders in a directory. Always the first step before reading or editing — JARVIS auto-chains from here.',
    examples: [{tag: 'list', text: '"What is on my desktop?"'}, {tag: 'check', text: '"Show me the downloads folder"'}] },
  { cat: 'files',    icon: FileText,    name: 'read file',              say: '"Read my diary.txt" / "Show me what\'s in the list"',  desc: 'Reads the full content of any text-based or code file. Supports offset and limit for large files.',
    examples: [{tag: 'read', text: '"Read the recipe.txt file"'}, {tag: 'inspect', text: '"What is inside my notes?"'}] },
  { cat: 'files',    icon: FileText,    name: 'write file',             say: '"Create a text file called ideas.txt"',             desc: 'Creates new files from scratch. Will not silently overwrite existing ones — your data is safe.',
    examples: [{tag: 'create', text: '"Create a new file named journal.md"'}, {tag: 'write', text: '"Write a grocery list in shopping.txt"'}] },
  { cat: 'files',    icon: Wrench,      name: 'edit file',              say: '"Change milk to almond milk in my list"',           desc: 'Smart string replacement inside any file. Whitespace-resilient — it finds the right line even with mixed indentation.',
    examples: [{tag: 'edit', text: '"Change Monday to Tuesday in schedule.txt"'}, {tag: 'replace', text: '"Replace the word sad with happy in story.txt"'}] },
  { cat: 'files',    icon: Folder,      name: 'manage workspace',       say: '"Create a Vacation folder on my desktop" / "Delete old_photos"', desc: 'Creates folders, moves, renames, or soft-deletes items. For folders only — write_file handles file creation.',
    examples: [{tag: 'mkdir', text: '"Create a folder called Music"'}, {tag: 'delete', text: '"Delete the old_backups folder"'}, {tag: 'move', text: '"Move resume.pdf to desktop"'}] },
  
  // OS
  { cat: 'os',       icon: Cpu,         name: 'open application',       say: '"Open Calculator" / "Launch Spotify"',                     desc: 'Launches any installed desktop app with fuzzy name matching. Say the name — JARVIS finds the binary.',
    examples: [{tag: 'launch', text: '"Open Notepad"'}, {tag: 'start', text: '"Launch Spotify"'}] },
  { cat: 'os',       icon: Shield,      name: 'kill process',           say: '"Kill Spotify" / "Close Notepad"',                       desc: 'Forcefully terminates any running process by name. Fuzzy matching — "chrom" works just as well as "chrome.exe".',
    examples: [{tag: 'kill', text: '"Kill the music player"'}, {tag: 'terminate', text: '"Close the calculator"'}] },
  { cat: 'os',       icon: Zap,         name: 'run scenario',           say: '"Run morning routine scenario" / "Activate focus scenario"',           desc: 'Executes a custom automation script from your Run Directory. Name the file, name the command. You must say "scenario".',
    examples: [{tag: 'execute', text: '"Run gaming mode scenario"'}, {tag: 'trigger', text: '"Run bedtime scenario"'}] },
  { cat: 'os',       icon: Power,       name: 'close window',           say: '"Close this window" / "Close the active window"',       desc: 'Simulates Alt+F4 on the active foreground window. No confirmation, instant.',
    examples: [{tag: 'close', text: '"Close this window"'}] },
  { cat: 'os',       icon: Camera,      name: 'take screenshot',        say: '"Take a screenshot" / "Capture my screen"',             desc: 'Captures your screen and saves the image directly to your desktop.',
    examples: [{tag: 'capture', text: '"Take a screenshot"'}, {tag: 'snap', text: '"Capture my screen"'}] },
  
  // Hardware
  { cat: 'hardware', icon: Volume2,     name: 'set volume',             say: '"Set volume to 40" / "Lower it by 15"',                 desc: 'Adjusts system volume or JARVIS voice volume. "Set to X" for absolute, "increase/decrease by X" for relative.',
    examples: [{tag: 'absolute', text: '"Set volume to 40"'}, {tag: 'relative', text: '"Lower volume by 15"'}] },
  { cat: 'hardware', icon: Sun,         name: 'set brightness',         say: '"Set brightness to 60%" / "Increase brightness by 20"', desc: 'Controls monitor brightness. Same pattern: absolute or relative. Works cross-platform.',
    examples: [{tag: 'absolute', text: '"Set brightness to 60%"'}, {tag: 'relative', text: '"Increase brightness by 20"'}] },
  { cat: 'hardware', icon: Activity,    name: 'system status',          say: '"How much battery do I have?" / "Check my RAM"',          desc: 'Returns current CPU load, RAM usage, and battery metrics in plain language.',
    examples: [{tag: 'check', text: '"How much battery is left?"'}, {tag: 'status', text: '"Check my CPU usage"'}] },
  { cat: 'hardware', icon: Power,       name: 'system power',           say: '"Lock my screen" / "Restart" / "Shut down"',            desc: 'Lock, restart, or shutdown the machine. Requires explicit confirmation or root mode.',
    examples: [{tag: 'lock', text: '"Lock my screen"'}, {tag: 'shutdown', text: '"Shut down the computer"'}] },
  
  // System
  { cat: 'system',   icon: MessageSquare, name: 'request user input',   say: '"I need to type a password" / "Open an input box"',                  desc: 'Opens a GUI popup for typed input — passwords, long URLs, exact strings you don\'t want to speak.',
    examples: [{tag: 'input', text: '"I need to type something secretly"'}, {tag: 'prompt', text: '"Open a text input box"'}] },
  { cat: 'system',   icon: Info,        name: 'get nexus info',         say: '"Who built you?" / "What version are you?"',        desc: 'Returns core system identity, architecture info, and developer details. JARVIS never guesses — it reads from here.',
    examples: [{tag: 'info', text: '"Who built you?"'}, {tag: 'specs', text: '"What is your current version?"'}] },
  { cat: 'system',   icon: Terminal,    name: 'deactivate core',        say: '"Take a rest, Jarvis" / "Goodbye"',                 desc: 'Authorized shutdown with a 15-second farewell sequence. JARVIS unloads models from VRAM before leaving.',
    examples: [{tag: 'sleep', text: '"Take a rest, Jarvis"'}, {tag: 'exit', text: '"Shut yourself down"'}] },
  
  // Internal Commands
  { cat: 'internal', icon: Play,        name: 'startup sequence',       say: '"Jarvis start up"',                                     desc: 'Triggers the startup video and internal initialization sequences.',
    examples: [{tag: 'trigger', text: '"Jarvis start up"'}, {tag: 'trigger', text: '"Start up"'}] },
  { cat: 'internal', icon: Settings,    name: 'nexus panel',            say: '"Show settings panel"',                                 desc: 'Directly opens the JARVIS Nexus Settings GUI.',
    examples: [{tag: 'open', text: '"Nexus panel"'}, {tag: 'open', text: '"Show settings"'}] },
  { cat: 'internal', icon: Mic,         name: 'always listening',       say: '"Always listening on/off"',                             desc: 'Toggles the continuous wake-word listening state.',
    examples: [{tag: 'enable', text: '"Enable always listening"'}, {tag: 'disable', text: '"Turn off always listening"'}] },
  { cat: 'internal', icon: Shield,      name: 'root mode',              say: '"Root mode on/off"',                                    desc: 'Toggles root access, bypassing permission checks for critical OS interactions.',
    examples: [{tag: 'enable', text: '"Enable root mode"'}, {tag: 'disable', text: '"Disable root access"'}] },
  { cat: 'internal', icon: Brain,       name: 'overthinking mode',      say: '"Overthinking mode on/off"',                            desc: 'Forces the system to use the heavy reasoning model for all incoming prompts.',
    examples: [{tag: 'enable', text: '"Activate overthinking mode"'}, {tag: 'disable', text: '"Turn off overthinking mode"'}] }
];

export const RELEASES = [
  {
    version: 0.1,
    label: 'Legacy Prototype',
    badge: 'Evolutionary Chaos',
    description:
      'The pre-architectural era. Hardcoded logic, unstable plain-text memory, and the infamous tool-execution incident that once wiped an entire browser from the system. A necessary stage of brutal lessons that defined the V.A.N.T. standard.',
    whatsNew: [
      'Initial Proof of Concept — zero modularity, maximum chaos.',
      'Monolithic if-else command routing — brittle by design.',
      'Unindexed .txt file storage for memory (spectacularly unstable).',
      'The Great Browser Wipeout — the legendary lesson in tool-call safety.',
    ],
    stats: [
      { label: 'Reliability', val: '~15%' },
      { label: 'Architecture', val: 'Monolithic' },
      { label: 'Cloud Deps', val: '0' },
      { label: 'Lessons Learned', val: 'Infinite' },
    ],
    features: [
      {
        icon: Lock,
        title: 'Hardcoded Scripts',
        desc: 'Brittle if-this-then-that logic strings. The system broke instantly if the user deviated from exact keywords — zero semantic understanding.',
        color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20',
      },
      {
        icon: Terminal,
        title: 'The Browser Incident',
        desc: 'A catastrophic tool-execution failure that uninstalled the local browser. It paved every defensive programming standard that exists in v1.0 today.',
        color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20',
      },
    ],
  },
  {
    version: 1.0,
    label: 'Current Build',
    badge: 'Stable Engine',
    description:
      'A fully local AI OS orchestrator. Modular, decoupled, and engineered for near-zero latency — dual-model cognitive processing, thread-safe multi-layer memory, 30 built-in tools, and 100% offline by design.',
    whatsNew: [
      'Dual-Model cognitive brain with TTFT KV-Cache pre-ignition at boot.',
      'Producer-Consumer TTS architecture — zero silence gaps between sentences.',
      'Smart Interruption with real-time mic buffer flushing and fuzzy matching.',
      'Thread-safe multi-layer SQLite memory: Working, Episodic, Semantic, Procedural.',
      'Zombie Process Management — 100% LLM uptime with self-healing recovery.',
      'Setup Wizard webview GUI + autostart sync for Windows and Linux.',
    ],
    stats: [
      { label: 'Latency', val: 'Low' },
      { label: 'Offline', val: '100%' },
      { label: 'MIN VRAM', val: '4GB' },
      { label: 'Built-in Tools', val: '30+' },
    ],
    features: [
      {
        icon: Cpu,
        title: 'The Orchestrator Engine',
        desc: 'A State Machine and Agentic loop managing memory, language modes, and permissions. Internal Command Processor with Fuzzy Matching for instant execution — zero LLM overhead for known commands.',
        color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20',
      },
      {
        icon: Brain,
        title: 'Dual-Model Brain',
        desc: 'Switches dynamically between normal_model (fast tasks) and overthink_model (deep logic). Immutable/Dynamic prompt layers, native JSON tool calling, and Zombie Process Management keep it alive.',
        color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20',
      },
      {
        icon: Database,
        title: 'Multi-Layer Cognition',
        desc: 'Thread-safe SQLite with Mutex locks routing to Working, Episodic, Semantic, and Procedural memory. One consolidated auto-classification API — sentence-transformers for offline semantic vector search.',
        color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20',
      },
      {
        icon: AudioLines,
        title: 'Zero-Latency Sensory',
        desc: 'faster-whisper STT with dynamic hardware scaling (float16/int8) and real-time interrupt flush. Piper TTS double-queue Producer-Consumer architecture eliminates every silence gap.',
        color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20',
      },
      {
        icon: Globe,
        title: 'OS & Web Orchestration',
        desc: 'curl_cffi browser impersonation for headless deep research with Jina AI fallback. Strict OS workspace boundaries — sensitive paths require explicit permission gates.',
        color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20',
      },
      {
        icon: Activity,
        title: 'Decoupled WatchDog',
        desc: 'A completely decoupled background thread that syncs RAM tasks, monitors states, and fires proactive voice reminders with snooze logic — without touching the main engine loop.',
        color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20',
      },
    ],
    models: [
      {
        icon: Terminal, badge: 'ENGINE', badgeColor: 'text-slate-400',
        badgeBg: 'bg-slate-500/10 border-slate-500/20', iconBg: 'bg-slate-500/10 border-slate-500/20', hoverBorder: 'hover:border-slate-500/40',
        title: 'Ollama Framework', subtitle: 'Local AI Orchestrator',
        desc: 'The foundational local inference engine. JARVIS manages it automatically — TTFT KV-Cache pre-ignition, self-healing model builds, and zombie process recovery.',
        tags: ['Required', 'Background Service', 'Self-Healing'],
        link: { url: 'https://ollama.com/download', text: 'Download from Ollama' },
      },
      {
        icon: Brain, badge: 'LLM (OLLAMA)', badgeColor: 'text-blue-400',
        badgeBg: 'bg-blue-500/10 border-blue-500/20', iconBg: 'bg-blue-500/10 border-blue-500/20', hoverBorder: 'hover:border-blue-500/40',
        title: 'Qwen Models / Any GGUF', subtitle: 'Powered by Ollama',
        desc: 'Drop any .gguf into models/llm/ — JARVIS auto-detects and builds the Modelfile. Native JSON tool calling preferred; falls back to Regex parsing if needed.',
        tags: ['Required', 'Compatible', 'Auto-detected'],
      },
      {
        icon: Mic, badge: 'STT', badgeColor: 'text-purple-400',
        badgeBg: 'bg-purple-500/10 border-purple-500/20', iconBg: 'bg-purple-500/10 border-purple-500/20', hoverBorder: 'hover:border-purple-500/40',
        title: 'Faster-Whisper', subtitle: 'by OpenAI · CTranslate2 backend',
        desc: 'Dynamically scales compute (float16, int8) based on your hardware. Strict VAD filtering and real-time interrupt handling at the buffer level.',
        tags: ['Required', 'Lightweight', 'Hardware-aware'],
      },
      {
        icon: AudioLines, badge: 'TTS', badgeColor: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/10 border-emerald-500/20', iconBg: 'bg-emerald-500/10 border-emerald-500/20', hoverBorder: 'hover:border-emerald-500/40',
        title: 'Piper TTS', subtitle: 'Jarvis Voice Package',
        desc: 'Ultra-fast local synthesis with pre-compiled Regex normalization — code blocks and math symbols stripped before vocalization. Producer-Consumer queue for gapless output.',
        tags: ['Required', 'Gapless', 'Fastest'],
        link: { url: 'https://huggingface.co/rhasspy/piper-voices/tree/main/en', text: 'Download from HuggingFace' },
      },
      // {
      //   icon: Sparkles, badge: 'EXCLUSIVE', badgeColor: 'text-amber-400',
      //   badgeBg: 'bg-amber-500/10 border-amber-500/20', iconBg: 'bg-amber-500/10 border-amber-500/20', hoverBorder: 'hover:border-amber-500/40',
      //   title: 'JARVIS Custom Model', subtitle: 'Fine-tuned by V.A.N.T.',
      //   desc: 'Proprietary fine-tuned model trained specifically on JARVIS OS capabilities, defensive programming logic, and optimal tool-calling behavior for the NEXUS ecosystem.',
      //   tags: ['Optional', 'Fine-Tuned', 'NEXUS-optimized'],
      //   link: { url: 'https://huggingface.co/VANT-HQ/JARVIS-Qwen3-4B', text: 'Download from HuggingFace' },
      // },
    ],
    roadmap: [
      { task: 'NEXUS Architecture: Lowest Requirements & Max Performance', status: 'Shipped',     icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
      { task: 'Thread-safe SQLite Multi-Layer Memory Strategy',            status: 'Shipped',     icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
      { task: 'Near-Zero TTFT & KV-Cache Optimization',                    status: 'Shipped',     icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
      { task: 'Zombie Process Management & Self-Healing Core',             status: 'Shipped',     icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
      { task: 'Anti-Fail Strategy & Interrupt State Machine',              status: 'Shipped',     icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
      { task: 'Multi-LLM Support & Native Auto-Detection',                 status: 'Shipped',     icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
      { task: 'Settings Panel & First-Run Setup Wizard GUI',               status: 'Shipped',     icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
      { task: 'Windows 10/11 Full Support & Stable Release',               status: 'Shipped',     icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
      { task: 'Linux Binary Release & Validation',                         status: 'In Progress', icon: CircleDashed, color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-400/20' },
      { task: 'JARVIS Fine-Tuned Model Public Release on HF',              status: 'Planned',     icon: Circle,       color: 'text-slate-500',   bg: 'bg-white/5',        border: 'border-white/10' }
    ],
  },
];
