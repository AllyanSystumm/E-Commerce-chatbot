import json
from groq import Groq
from app.core.config import settings
from app.core.prompt_templates import SYSTEM_PROMPT
from app.schemas.schemas import ChatRequest

client = Groq(api_key=settings.GROQ_API_KEY)

class AIService:
    @staticmethod
    async def get_chat_response(request: ChatRequest):
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT}
        ]
        
        # Build context string
        context = {
            "conversation_id": request.conversation_id,
            "channel": request.channel,
            "customer": request.customer,
            "business_context": request.business_context.model_dump() if request.business_context else None,
            "inventory": [item.model_dump() for item in request.inventory] if request.inventory else []
        }
        
        # Add context as a hidden message for the AI
        messages.append({"role": "system", "content": f"CURRENT CONTEXT: {json.dumps(context)}"})
        
        # Add history
        for msg in request.conversation_history:
            messages.append({"role": msg.role, "content": msg.content})
            
        # Add current message
        messages.append({"role": "user", "content": request.message})
        
        try:
            completion = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                response_format={"type": "json_object"},
                temperature=0.3, # Lower temperature for better reliability in JSON
                max_tokens=2048,
                top_p=1,
                stream=False,
                stop=None,
            )
            
            response_content = completion.choices[0].message.content
            return json.loads(response_content)
        except Exception as e:
            print(f"Error in AIService: {e}")
            # Graceful fallback as per Rule 9
            return {
                "intent": "human_escalation",
                "confidence": 0.0,
                "response_message": "I'm having trouble processing your request. Let me connect you to a human.",
                "backend_action": {"type": "escalate_to_human"},
                "escalate": True,
                "metadata": {
                    "sentiment": "neutral",
                    "order_probability": 0.0,
                    "customer_type": "unknown"
                }
            }
