from flask import Blueprint, request, jsonify
from models.inventory import Inventory
from utils.database import db
from datetime import datetime

inventory_bp = Blueprint('inventory', __name__)


@inventory_bp.route('/inventory', methods=['GET'])
def get_inventory():
    """
    GET /api/inventory
    Retrieve all inventory items
    Optional query parameters:
    - category: filter by category
    - low_stock: if 'true', returns items with quantity < 10
    """
    try:
        category = request.args.get('category')
        low_stock = request.args.get('low_stock')
        
        query = Inventory.query
        
        if category:
            query = query.filter_by(category=category)
        
        if low_stock == 'true':
            query = query.filter(Inventory.quantity < 10)
        
        items = query.all()
        
        return jsonify({
            'success': True,
            'data': [item.to_dict() for item in items],
            'count': len(items)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@inventory_bp.route('/inventory', methods=['POST'])
def create_inventory_item():
    """
    POST /api/inventory
    Create a new inventory item
    Request body (JSON):
    {
        "item_name": "Rice",
        "category": "Grains",
        "quantity": 50,
        "unit": "kg",
        "expiry_date": "2025-12-31",  // optional
        "donor_name": "John Doe",      // optional
        "location": "Warehouse A",     // optional
        "notes": "Organic rice"        // optional
    }
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        is_valid, error_message = Inventory.validate_required_fields(data)
        if not is_valid:
            return jsonify({
                'success': False,
                'error': error_message
            }), 400
        
        # Create new inventory item
        new_item = Inventory(
            item_name=data['item_name'],
            category=data['category'],
            quantity=data['quantity'],
            unit=data['unit'],
            expiry_date=datetime.strptime(data['expiry_date'], '%Y-%m-%d').date() if data.get('expiry_date') else None,
            donor_name=data.get('donor_name'),
            location=data.get('location'),
            notes=data.get('notes')
        )
        
        db.session.add(new_item)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Inventory item created successfully',
            'data': new_item.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@inventory_bp.route('/inventory/<int:item_id>', methods=['GET'])
def get_single_item(item_id):
    """
    GET /api/inventory/<item_id>
    Retrieve a single inventory item by ID
    """
    try:
        item = Inventory.query.get(item_id)
        
        if not item:
            return jsonify({
                'success': False,
                'error': 'Item not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': item.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@inventory_bp.route('/inventory/<int:item_id>', methods=['PATCH'])
def update_inventory_item(item_id):
    """
    PATCH /api/inventory/<item_id>
    Update an existing inventory item (partial update)
    Request body (JSON) - all fields optional:
    {
        "item_name": "White Rice",
        "quantity": 45,
        "notes": "Updated stock"
    }
    """
    try:
        item = Inventory.query.get(item_id)
        
        if not item:
            return jsonify({
                'success': False,
                'error': 'Item not found'
            }), 404
        
        data = request.get_json()
        
        # Update only provided fields
        if 'item_name' in data:
            item.item_name = data['item_name']
        if 'category' in data:
            item.category = data['category']
        if 'quantity' in data:
            item.quantity = data['quantity']
        if 'unit' in data:
            item.unit = data['unit']
        if 'expiry_date' in data:
            item.expiry_date = datetime.strptime(data['expiry_date'], '%Y-%m-%d').date() if data['expiry_date'] else None
        if 'donor_name' in data:
            item.donor_name = data['donor_name']
        if 'location' in data:
            item.location = data['location']
        if 'notes' in data:
            item.notes = data['notes']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Inventory item updated successfully',
            'data': item.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@inventory_bp.route('/inventory/<int:item_id>', methods=['DELETE'])
def delete_inventory_item(item_id):
    """
    DELETE /api/inventory/<item_id>
    Delete an inventory item
    """
    try:
        item = Inventory.query.get(item_id)
        
        if not item:
            return jsonify({
                'success': False,
                'error': 'Item not found'
            }), 404
        
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Inventory item deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500