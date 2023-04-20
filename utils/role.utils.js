module.export = function assignPermissions(role) {
    switch (role) {
        case 'customer':
        return ['read_products'];
        case 'seller':
        return ['read_products', 'create_products', 'update_products', 'delete_products', 'read_orders', 'update_orders'];
        case 'admin':
        return ['read_products', 'create_products', 'update_products', 'delete_products', 'read_orders', 'update_orders', 'manage_users'];
        case 'superadmin':
        return ['read_products', 'create_products', 'update_products', 'delete_products', 'read_orders', 'update_orders', 'manage_users', 'manage_roles'];
        default:
        return [];
    }
}