from fastapi import APIRouter, Depends
from app.schemas.schemas import ChatRequest, ChatResponse, BusinessContext, InventoryItem, Message, Stock
from app.services.ai_service import AIService
from sqlalchemy.orm import Session
from app.db.database import get_db # Assuming this exists or I'll create/check it
from app.models.models import Product # Assuming this exists or I'll check it

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request_data: dict, db: Session = Depends(get_db)):
    # 1. Fetch Inventory from DB
    products = db.query(Product).all()
    inventory = []
    for p in products:
        inventory.append(InventoryItem(
            product_id=str(p.id),
            name=p.name,
            price=float(p.price),
            variants=["S", "M", "L", "XL"], # Mocking variants for now as DB schema is simple
            stock=Stock(S=p.stock_quantity // 4, M=p.stock_quantity // 4, L=p.stock_quantity // 4, XL=p.stock_quantity // 4)
        ))

    # 2. Define Business Context (Mocking for now, could be in DB)
    business_context = BusinessContext(
        business_name="AION Malind Store",
        tone="friendly",
        shipping_policy="3-5 working days",
        return_policy="7-day exchange",
        payment_methods=["COD", "Bank Transfer"]
    )

    # 3. Build Full ChatRequest
    # Map incoming simple request to our structured one
    history = [Message(role=m['role'], content=m['content']) for m in request_data.get('history', [])]
    
    structured_request = ChatRequest(
        conversation_id=request_data.get('conversation_id', 'unknown'),
        channel=request_data.get('channel', 'web'),
        customer=request_data.get('customer'),
        business_context=business_context,
        inventory=inventory,
        conversation_history=history,
        message=request_data.get('message', '')
    )

    # 4. Get AI Response
    ai_response_dict = await AIService.get_chat_response(structured_request)
    
    # 5. Return structured response
    return ChatResponse(**ai_response_dict)
