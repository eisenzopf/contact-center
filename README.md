Here are the key files that handle chat messages:
src/app/dashboard/planner/components/ChatInterface.tsx - Main chat UI component
src/app/dashboard/planner/components/ChatMessage.tsx - Individual message rendering
src/app/dashboard/planner/services/messagePreparation.ts - Message preparation service
src/app/dashboard/planner/services/responseHandlers.ts - Response processing service
src/app/dashboard/planner/page.tsx - Main page with chat logic and state management

Supporting files:
src/app/api/proxy/route.ts - API route for LLM communication
src/semantics.json - Semantic definitions for message transformations
src/app/dashboard/planner/services/transformations.ts - Message transformation logic
src/app/dashboard/planner/types/handlers.ts - Response handler type definitions
src/app/dashboard/planner/types/messages.ts - Message type definitions
src/app/dashboard/planner/services/messagePreparation.ts - Message preparation service
src/app/dashboard/planner/services/responseHandlers.ts - Response processing service
