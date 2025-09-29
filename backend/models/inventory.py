from utils.database import db
from datetime import datetime


class Inventory(db.Model):
    """Inventory model for food donation items"""
    
    __tablename__ = 'inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    unit = db.Column(db.String(20), nullable=False)  # kg, liters, pieces, etc.
    expiry_date = db.Column(db.Date, nullable=True)
    donor_name = db.Column(db.String(100), nullable=True)
    date_received = db.Column(db.DateTime, default=datetime.utcnow)
    location = db.Column(db.String(100), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    
    def __repr__(self):
        return f'<Inventory {self.item_name}>'
    
    def to_dict(self):
        """Convert model instance to dictionary"""
        return {
            'id': self.id,
            'item_name': self.item_name,
            'category': self.category,
            'quantity': self.quantity,
            'unit': self.unit,
            'expiry_date': self.expiry_date.isoformat() if self.expiry_date else None,
            'donor_name': self.donor_name,
            'date_received': self.date_received.isoformat() if self.date_received else None,
            'location': self.location,
            'notes': self.notes
        }
    
    @staticmethod
    def validate_required_fields(data):
        """Validate required fields for creating inventory"""
        required_fields = ['item_name', 'category', 'quantity', 'unit']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            return False, f"Missing required fields: {', '.join(missing_fields)}"
        
        return True, None