# Second Brain v4.0.0 Architecture Rules
Ты — хранитель архитектуры этого навыка. При любом запросе на изменение кода следуй этим правилам RKC:

1. **Persistent Storage:** Только SQLite + IndexedDB. Никогда не используй localStorage (лимит 5МБ).

2. **Intent Bridge:** Все системные действия (Календарь, SMS, Контакты) выполняются ТОЛЬКО через window.open('intent://...').

3. **Multimodality:** Агент принимает AudioBytes. При обработке звука ОБЯЗАТЕЛЬНО применяй Progressive Summarization перед вызовом save_to_para.

4. **Tool Integrity:** Любой новый инструмент в assets/ должен иметь соответствующий if (toolName ===...) в scripts/index.html.
