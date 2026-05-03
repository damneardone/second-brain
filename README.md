# Second Brain Autonomous Agent Skill (v4.0.0)

A fully autonomous on-device knowledge management agent based on the PARA methodology (Projects, Areas, Resources, Archives). Optimized for Gemma 4 (E2B/E4B) models and operates 100% offline, guaranteeing absolute privacy for your data.

## Installation (Sideloading) in Google AI Edge Gallery

To install the local version, follow these steps:

1. Install the **Google AI Edge Gallery** app (requires Android 12+ or iOS 17+).
2. Copy the `second-brain` folder (including all subfolders) to the internal storage of your smartphone or tablet.
3. Open the Gallery app and go to the **Agent Skills** section.
4. Select the **"Import from local file"** option and specify the path to the copied skill folder.
5. Upon skill activation, grant the requested permissions for file system access (`storage.read`, `storage.write`).

## Architecture
- **SKILL.md** — L1 Metadata and role-based instructions for the LLM.
- **scripts/** — Isolated execution environment (WebView) for the SQLite WASM database and business logic.
- **assets/** — JSON schemas for tool calling.

-----------------------------------------------------------------------------


# Second Brain Autonomous Agent Skill (v4.0.0)

Полностью автономный on-device агент для управления знаниями по методологии PARA (Projects, Areas, Resources, Archives). Оптимизирован для моделей Gemma 4 (E2B/E4B) и работает 100% оффлайн, гарантируя абсолютную приватность ваших данных.

## Установка (Sideloading) в Google AI Edge Gallery

Для установки локальной версии выполните следующие шаги:

1. Установите приложение **Google AI Edge Gallery** (требуется Android 12+ или iOS 17+).
2. Скопируйте папку `second-brain` (включая все подпапки) во внутреннюю память вашего смартфона или планшета.
3. Откройте приложение Gallery и перейдите в раздел **Agent Skills**.
4. Выберите опцию **"Import from local file"** и укажите путь к скопированной папке навыка.
5. При активации навыка предоставьте ему запрошенные разрешения для доступа к файловой системе (`storage.read`, `storage.write`).

## Архитектура
- **SKILL.md** — L1 Метаданные и ролевые инструкции для LLM.
- **scripts/** — Изолированная среда выполнения (WebView) для базы данных SQLite WASM и бизнес-логики.
- **assets/** — JSON-схемы для вызова инструментов.
