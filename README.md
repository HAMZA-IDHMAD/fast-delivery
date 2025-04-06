# FastDelivery - Microservices E-commerce Delivery App 🚚

FastDelivery is a cloud-native microservices application that manages e-commerce deliveries.  
This system replaces a monolithic architecture with four independent microservices that communicate via REST APIs and share authentication via JWT tokens.

---

## 🧱 Services Architecture


┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Auth      │◄────┤  Produit    │     │  Commande   │
│ Service    │     │ Service     │◄────┤ Service     │
└─────────────┘     └─────────────┘     └─────────────┘
     ▲                   
     │                   
     ▼                   
┌─────────────┐     
│  Client     │     
│ (Customer)  │     
└─────────────┘     

🧩 Microservices:

1. Authentication Service (Port: 3004)
       Manages user accounts and authentication
       Provides JWT tokens for authorization
       User roles: admin, customer, delivery_person

2. Product Service (Port: 3001)
       Manages product catalog
       Tracks inventory levels
       Admin-only modifications

3. Order Service (Port: 3002)
       Processes customer orders
       Validates product availability
       Updates inventory after orders

4. Delivery Service (Port: 3003)
       Manages delivery process
       Tracks delivery status
       Assigns delivery personnel

✅ Prerequisites
       Node.js (v14 or higher)
       MongoDB (running locally on default port 27017)
       npm or yarn

⚙️ Installation
<pre>git clone https://github.com/your-repo/fast-delivery.git
cd fast-delivery
</pre>

Install dependencies for each service:
<pre>cd produit-service && npm install
cd ../commande-service && npm install
cd ../livraison-service && npm install
cd ../auth-service && npm install
</pre>

📄 Environment Variables
   Create a .env file in each service directory:
   <pre>JWT_SECRET=your_secure_secret
MONGODB_URI=mongodb://localhost:27017/service-name
PORT=300X
</pre>

🚀 Running the Services
    Start MongoDB (if not already running), then in separate terminals:
    <pre># Terminal 1
cd produit-service && npm start

# Terminal 2
cd ../commande-service && npm start

# Terminal 3
cd ../livraison-service && npm start

# Terminal 4
cd ../auth-service && npm start
</pre>
📡 API Endpoints

🔐 Authentication Service (http://localhost:3004)
      POST /auth/register – Register new user
      POST /auth/login – Login and get JWT token
      GET /auth/profil – Get user profile (requires JWT)

📦 Product Service (http://localhost:3001)
      POST /produit/ajouter – Add product (admin only)
      GET /produit/:id – Get product details
      PATCH /produit/:id/stock – Update stock (admin only)

📑 Order Service (http://localhost:3002)
      POST /commande/ajouter – Create new order
      GET /commande/:id – Get order details
      PATCH /commande/:id/statut – Update order status (admin only)

🚚 Delivery Service (http://localhost:3003)
      POST /livraison/ajouter – Create delivery (admin only)
      PUT /livraison/:id – Update delivery status

🔐 Authentication Flow
     Client registers or logs in via Auth Service
     Receives JWT token
     Includes token in Authorization header for protected endpoints:

🗃️ Database Structure
     Each service has its own MongoDB database:
     Auth Service: auth-service
     Product Service: produit-service
     Order Service: commande-service
     Delivery Service: livraison-service
