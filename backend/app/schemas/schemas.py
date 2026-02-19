from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Message(BaseModel):
    role: str
    content: str

class BusinessContext(BaseModel):
    business_name: str
    tone: str
    shipping_policy: str
    return_policy: str
    payment_methods: List[str]

class Stock(BaseModel):
    S: int = 0
    M: int = 0
    L: int = 0
    XL: int = 0

class InventoryItem(BaseModel):
    product_id: str
    name: str
    price: float
    variants: List[str]
    stock: Stock

class ChatRequest(BaseModel):
    conversation_id: str
    channel: str = "web"
    customer: Optional[dict] = None
    business_context: Optional[BusinessContext] = None
    inventory: Optional[List[InventoryItem]] = None
    conversation_history: List[Message]
    message: str # Current message

class BackendAction(BaseModel):
    type: str
    product_id: Optional[str] = None
    variant: Optional[str] = None
    quantity: Optional[int] = None

class AIMetadata(BaseModel):
    sentiment: str
    order_probability: float
    customer_type: str

class ChatResponse(BaseModel):
    intent: str
    confidence: float
    response_message: str
    backend_action: Optional[BackendAction] = None
    escalate: bool = False
    metadata: Optional[AIMetadata] = None

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    stock_quantity: int
    category: str

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: str
    full_name: str
    address: str
    phone: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True
