require("dotenv").config();
const express = require("express");
const cors = require("cors");

const odoo = require("./services/odoo");
const ai = require("./ai/assistant");

const app = express();
app.use(cors());
app.use(express.json());

// Sabit config (env yok)
const CONFIG = {
  ODOO_URL: "http://localhost:8069",
  ODOO_DB: "ALFA-ERP",
  ODOO_USERNAME: "alfateknoloji45@gmail.com",
  ODOO_PASSWORD: "Alfa-1299",
  PORT: parseInt(process.env.PORT || "5001", 10)
};

console.log("ALFAI CONFIG:", {
  ODOO_URL: CONFIG.ODOO_URL,
  ODOO_DB: CONFIG.ODOO_DB,
  ODOO_USERNAME: CONFIG.ODOO_USERNAME
});

const sessions = new Set();
const users = [];

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "ALFAI Backend Running" });
});

app.post("/api/auth/login", (req, res) => {
  const { username } = req.body || {};
  const token = Math.random().toString(36).slice(2);
  sessions.add(token);
  res.json({ ok: true, token, user: { name: username || "User" } });
});

app.post("/api/auth/signup", (req, res) => {
  try {
    const { email, password } = req.body || {};
    const e = String(email || "").toLowerCase();
    if (!e) return res.status(400).json({ ok: false, error: "Email required" });
    const exists = users.some(u => u.email === e);
    if (exists) return res.status(409).json({ ok: false, error: "Email already registered" });
    const id = (users[users.length - 1]?.id || 0) + 1;
    const u = { id, email: e, password: String(password || "") };
    users.push(u);
    const token = Math.random().toString(36).slice(2);
    sessions.add(token);
    res.json({ ok: true, token, user: { id, email: e } });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/auth/logout", (req, res) => {
  const { token } = req.body || {};
  if (token) sessions.delete(token);
  res.json({ ok: true });
});

app.post("/api/email/invoice/:id", async (req, res) => {
  try {
    const invoiceId = parseInt(req.params.id, 10);
    const { to } = req.body || {};
    res.json({ ok: true, sent: true, to, invoiceId });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Odoo version
app.get("/api/odoo/version", async (req, res) => {
  try {
    const v = await odoo.versionInfo(CONFIG.ODOO_URL);
    res.json({ ok: true, version: v });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Summary
app.get("/api/odoo/summary", async (req, res) => {
  try {
    const summary = await odoo.fetchSummary(CONFIG);
    res.json({ ok: true, summary });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Finance
app.get("/api/odoo/finance", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "200", 10);
    const finance = await odoo.fetchFinance(CONFIG, limit);
    res.json({ ok: true, finance });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Invoice details
app.get("/api/odoo/invoice/:id", async (req, res) => {
  try {
    const invoiceId = parseInt(req.params.id, 10);
    const invoice = await odoo.fetchInvoiceDetails(CONFIG, invoiceId);
    res.json({ ok: true, invoice });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Create invoice
app.post("/api/odoo/invoice", async (req, res) => {
  try {
    const result = await odoo.createInvoice(CONFIG, req.body);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Record payment
app.post("/api/odoo/invoice/:id/payment", async (req, res) => {
  try {
    const invoiceId = parseInt(req.params.id, 10);
    const { amount } = req.body;
    const result = await odoo.recordPayment(CONFIG, invoiceId, amount);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Inventory
app.get("/api/odoo/inventory", async (req, res) => {
  try {
    const inventory = await odoo.fetchInventory(CONFIG);
    res.json({ ok: true, inventory });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Products
app.get("/api/odoo/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const products = await odoo.fetchProducts(CONFIG, limit);
    res.json({ ok: true, products });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Create product
app.post("/api/odoo/products", async (req, res) => {
  try {
    const result = await odoo.createProduct(CONFIG, req.body);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Update product
app.put("/api/odoo/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const result = await odoo.updateProduct(CONFIG, productId, req.body);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Delete product
app.delete("/api/odoo/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const result = await odoo.deleteProduct(CONFIG, productId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Reports
app.get("/api/odoo/reports", async (req, res) => {
  try {
    const reports = await odoo.fetchReports(CONFIG);
    res.json({ ok: true, reports });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Customers
app.get("/api/odoo/customers", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "200", 10);
    const customers = await odoo.fetchCustomers(CONFIG, limit);
    res.json({ ok: true, customers });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/odoo/vendors", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "200", 10);
    const vendors = await odoo.fetchVendors(CONFIG, limit);
    res.json({ ok: true, vendors });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Create customer
app.post("/api/odoo/customers", async (req, res) => {
  try {
    const result = await odoo.createCustomer(CONFIG, req.body);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Update customer
app.put("/api/odoo/customers/:id", async (req, res) => {
  try {
    const customerId = parseInt(req.params.id, 10);
    const result = await odoo.updateCustomer(CONFIG, customerId, req.body);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Sales Orders
app.get("/api/odoo/sales", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const orders = await odoo.fetchSalesOrders(CONFIG, limit);
    res.json({ ok: true, orders });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/odoo/sales/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const order = await odoo.fetchSalesOrderDetails(CONFIG, orderId);
    res.json({ ok: true, order });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/odoo/taxes", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "200", 10);
    const taxes = await odoo.fetchTaxes(CONFIG, limit);
    res.json({ ok: true, taxes });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/odoo/uoms", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "200", 10);
    const uoms = await odoo.fetchUOMs(CONFIG, limit);
    res.json({ ok: true, uoms });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Create sales order
app.post("/api/odoo/sales", async (req, res) => {
  try {
    const result = await odoo.createSalesOrder(CONFIG, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Delete sales order
app.delete("/api/odoo/sales/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const result = await odoo.deleteSalesOrder(CONFIG, orderId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Update sales order
app.put("/api/odoo/sales/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const result = await odoo.updateSalesOrder(CONFIG, orderId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Purchases
app.get("/api/odoo/purchases", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const orders = await odoo.fetchPurchases(CONFIG, limit);
    res.json({ ok: true, orders });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/odoo/purchases/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const order = await odoo.fetchPurchaseDetails(CONFIG, orderId);
    res.json({ ok: true, order });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/odoo/purchases", async (req, res) => {
  try {
    const result = await odoo.createPurchase(CONFIG, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/api/odoo/purchases/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const result = await odoo.deletePurchase(CONFIG, orderId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/odoo/purchases/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const result = await odoo.updatePurchase(CONFIG, orderId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Projects
app.get("/api/odoo/projects", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const data = await odoo.fetchProjects(CONFIG, limit);
    res.json({ ok: true, ...data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/odoo/projects/task", async (req, res) => {
  try {
    const result = await odoo.createProjectTask(CONFIG, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/api/odoo/projects/task/:id", async (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const result = await odoo.deleteProjectTask(CONFIG, taskId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/odoo/projects/task/:id", async (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const result = await odoo.updateProjectTask(CONFIG, taskId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/odoo/projects/:id", async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const result = await odoo.updateProject(CONFIG, projectId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// HR
app.get("/api/odoo/hr", async (req, res) => {
  try {
    const data = await odoo.fetchHR(CONFIG);
    res.json({ ok: true, ...data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/odoo/hr/employee", async (req, res) => {
  try {
    const result = await odoo.createEmployee(CONFIG, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/api/odoo/hr/employee/:id", async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id, 10);
    const result = await odoo.deleteEmployee(CONFIG, employeeId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/odoo/hr/employee/:id", async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id, 10);
    const result = await odoo.updateEmployee(CONFIG, employeeId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Manufacturing
app.get("/api/odoo/manufacturing", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const data = await odoo.fetchManufacturing(CONFIG, limit);
    res.json({ ok: true, ...data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/odoo/manufacturing", async (req, res) => {
  try {
    const result = await odoo.createProduction(CONFIG, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/api/odoo/manufacturing/:id", async (req, res) => {
  try {
    const prodId = parseInt(req.params.id, 10);
    const result = await odoo.deleteProduction(CONFIG, prodId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/odoo/manufacturing/:id", async (req, res) => {
  try {
    const prodId = parseInt(req.params.id, 10);
    const result = await odoo.updateProduction(CONFIG, prodId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Maintenance
app.get("/api/odoo/maintenance", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const data = await odoo.fetchMaintenance(CONFIG, limit);
    res.json({ ok: true, ...data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/odoo/maintenance", async (req, res) => {
  try {
    const result = await odoo.createMaintenance(CONFIG, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/api/odoo/maintenance/:id", async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const result = await odoo.deleteMaintenance(CONFIG, reqId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/odoo/maintenance/:id", async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const result = await odoo.updateMaintenance(CONFIG, reqId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Helpdesk
app.get("/api/odoo/helpdesk", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const data = await odoo.fetchHelpdesk(CONFIG, limit);
    res.json({ ok: true, ...data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/odoo/helpdesk", async (req, res) => {
  try {
    const result = await odoo.createHelpdeskTicket(CONFIG, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/api/odoo/helpdesk/:id", async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id, 10);
    const result = await odoo.deleteHelpdeskTicket(CONFIG, ticketId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/odoo/helpdesk/:id", async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id, 10);
    const result = await odoo.updateHelpdeskTicket(CONFIG, ticketId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Logistics
app.get("/api/odoo/logistics", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const data = await odoo.fetchLogistics(CONFIG, limit);
    res.json({ ok: true, ...data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/odoo/logistics", async (req, res) => {
  try {
    const result = await odoo.createLogistics(CONFIG, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/odoo/logistics/:id", async (req, res) => {
  try {
    const pickingId = parseInt(req.params.id, 10);
    const result = await odoo.updateLogistics(CONFIG, pickingId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/api/odoo/logistics/:id", async (req, res) => {
  try {
    const pickingId = parseInt(req.params.id, 10);
    const result = await odoo.deleteLogistics(CONFIG, pickingId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/odoo/logistics/types", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const data = await odoo.fetchPickingTypes(CONFIG, limit);
    res.json({ ok: true, ...data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// CRM
app.get("/api/odoo/crm/leads", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const data = await odoo.fetchCRMLeads(CONFIG, limit);
    res.json({ ok: true, ...data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/odoo/crm/leads", async (req, res) => {
  try {
    const result = await odoo.createCRMLead(CONFIG, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/odoo/crm/leads/:id", async (req, res) => {
  try {
    const leadId = parseInt(req.params.id, 10);
    const result = await odoo.updateCRMLead(CONFIG, leadId, req.body || {});
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/api/odoo/crm/leads/:id", async (req, res) => {
  try {
    const leadId = parseInt(req.params.id, 10);
    const result = await odoo.deleteCRMLead(CONFIG, leadId);
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// AI CFO Analysis
app.post("/api/ai/cfo", async (req, res) => {
  try {
    const { prompt, summary } = req.body || {};
    let result = null;
    try {
      if (process.env.OPENAI_API_KEY) {
        result = await ai.cfoLLMOpenAI({ prompt, summary, apiKey: process.env.OPENAI_API_KEY });
      } else if (process.env.OPENROUTER_API_KEY) {
        result = await ai.cfoLLMOpenRouter({ prompt, summary, apiKey: process.env.OPENROUTER_API_KEY });
      } else if (process.env.HF_API_TOKEN) {
        result = await ai.cfoLLMHuggingFace({ prompt, summary, apiToken: process.env.HF_API_TOKEN });
      } else {
        result = await ai.cfoAnalysis({ prompt, summary });
      }
    } catch (llmErr) {
      console.error("CFO LLM error:", llmErr.message);
      result = await ai.cfoAnalysis({ prompt, summary });
    }
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/ai/chat", async (req, res) => {
  try {
    const { prompt } = req.body || {};
    let summary = null;
    try {
      summary = await odoo.fetchSummary(CONFIG);
    } catch {}
    let result = null;
    try {
      if (process.env.OPENAI_API_KEY) {
        result = await ai.chatLLM({ prompt, summary, apiKey: process.env.OPENAI_API_KEY });
      } else if (process.env.OPENROUTER_API_KEY) {
        result = await ai.chatLLMOpenRouter({ prompt, summary, apiKey: process.env.OPENROUTER_API_KEY });
      } else if (process.env.HF_API_TOKEN) {
        result = await ai.chatLLMHuggingFace({ prompt, summary, apiToken: process.env.HF_API_TOKEN });
      } else {
        result = await ai.chat({ prompt, summary });
      }
    } catch (llmErr) {
      console.error("LLM provider error:", llmErr.message);
      result = await ai.chat({ prompt, summary });
    }
    res.json({ ok: true, result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Quotes (lightweight in-memory API)
let QUOTES = [
  {
    id: 1,
    customer_name: "Demo Müşteri",
    customer_email: "demo@example.com",
    items: [{ name: "Hizmet", quantity: 1, price: 1000 }],
    total: 1000,
    discount: 0,
    tax: 20,
    status: "pending",
    created_at: new Date().toISOString(),
    created_by: "system"
  }
];

app.get("/api/quotes", (req, res) => {
  res.json(QUOTES);
});

app.post("/api/quotes", (req, res) => {
  try {
    const { customer_name, customer_email, items, total, discount = 0, tax = 0 } = req.body || {};
    const id = (QUOTES[QUOTES.length - 1]?.id || 0) + 1;
    const q = {
      id,
      customer_name,
      customer_email,
      items: Array.isArray(items) ? items : [],
      total: Number(total) || 0,
      discount: Number(discount) || 0,
      tax: Number(tax) || 0,
      status: "pending",
      created_at: new Date().toISOString(),
      created_by: "system"
    };
    QUOTES.push(q);
    res.json(q);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/quotes/:id/status", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body || {};
    const idx = QUOTES.findIndex(q => q.id === id);
    if (idx === -1) return res.status(404).json({ ok: false, error: "Quote not found" });
    QUOTES[idx].status = String(status || "pending");
    res.json(QUOTES[idx]);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Subscriptions (lightweight in-memory API)
let CURRENT_SUB = {
  id: "sub_demo_1",
  plan_id: "starter",
  status: "active",
  startDate: new Date(Date.now() - 2592000000).toISOString().slice(0, 10),
  nextBilling: new Date(Date.now() + 172800000).toISOString().slice(0, 10),
  price: 299
};

app.get("/api/subscriptions/current", (req, res) => {
  res.json(CURRENT_SUB);
});

app.post("/api/subscriptions/create", (req, res) => {
  try {
    const { plan_id } = req.body || {};
    CURRENT_SUB = {
      id: `sub_${Math.random().toString(36).slice(2)}`,
      plan_id: String(plan_id || "starter"),
      status: "active",
      startDate: new Date().toISOString().slice(0, 10),
      nextBilling: new Date(Date.now() + 2592000000).toISOString().slice(0, 10),
      price: plan_id === "pro" ? 799 : plan_id === "starter" ? 299 : 0
    };
    res.json(CURRENT_SUB);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/subscriptions/:id/cancel", (req, res) => {
  try {
    const id = req.params.id;
    if (CURRENT_SUB?.id !== id) return res.status(404).json({ ok: false, error: "Subscription not found" });
    CURRENT_SUB.status = "cancelled";
    res.json({ message: "Subscription cancelled", subscription: CURRENT_SUB });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/subscriptions/usage", (req, res) => {
  try {
    const quotesCount = QUOTES.length;
    const usersCount = 1;
    res.json({ quotes: quotesCount, users: usersCount });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

let COMPANIES = [
  { id: 1, name: "ABC Yazılım", subdomain: "abc", plan: "pro", users: 8, status: "active", mrr: 799 },
  { id: 2, name: "XYZ Danışmanlık", subdomain: "xyz", plan: "starter", users: 3, status: "active", mrr: 299 },
  { id: 3, name: "Test Company", subdomain: "test", plan: "starter", users: 1, status: "trial", mrr: 0 }
];

app.get("/api/saas/companies", (req, res) => {
  res.json({ companies: COMPANIES });
});

app.post("/api/saas/companies", (req, res) => {
  try {
    const { name, subdomain, email, phone, address, industry, size, plan } = req.body || {};
    const id = (COMPANIES[COMPANIES.length - 1]?.id || 0) + 1;
    const exists = COMPANIES.some(c => String(c.subdomain).toLowerCase() === String(subdomain).toLowerCase());
    if (exists) return res.status(409).json({ ok: false, error: "Subdomain already in use" });
    const c = {
      id,
      name: String(name || "Unnamed"),
      subdomain: String(subdomain || ""),
      plan: String(plan || "starter"),
      users: 1,
      status: "trial",
      mrr: plan === "pro" ? 799 : plan === "starter" ? 299 : 0,
      email: String(email || ""),
      phone: String(phone || ""),
      address: String(address || ""),
      industry: String(industry || ""),
      size: String(size || "")
    };
    COMPANIES.push(c);
    res.json({ ok: true, company: c });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/saas/subdomain/:name/available", (req, res) => {
  try {
    const name = String(req.params.name || "").toLowerCase();
    const reserved = ["demo", "test", "admin", "app", "www", "localhost"];
    const taken = reserved.includes(name) || COMPANIES.some(c => String(c.subdomain).toLowerCase() === name);
    res.json({ available: !taken });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/saas/companies/:id/status", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body || {};
    const idx = COMPANIES.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ ok: false, error: "Company not found" });
    COMPANIES[idx].status = String(status || COMPANIES[idx].status);
    res.json({ ok: true, company: COMPANIES[idx] });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.put("/api/saas/companies/:id/plan", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { plan } = req.body || {};
    const idx = COMPANIES.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ ok: false, error: "Company not found" });
    const p = String(plan || COMPANIES[idx].plan);
    COMPANIES[idx].plan = p;
    COMPANIES[idx].mrr = p === "pro" ? 799 : p === "starter" ? 299 : 0;
    res.json({ ok: true, company: COMPANIES[idx] });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.delete("/api/saas/companies/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const idx = COMPANIES.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ ok: false, error: "Company not found" });
    const removed = COMPANIES.splice(idx, 1)[0];
    res.json({ ok: true, company: removed });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(CONFIG.PORT, () => {
  console.log("ALFAI Odoo Backend listening on", CONFIG.PORT);
});
const ERRORS = [
  { id: 1, message: 'TypeError: Cannot read property', severity: 'high', timestamp: Date.now() - 120000, tenant: 'default' },
  { id: 2, message: 'Network Error: API timeout', severity: 'medium', timestamp: Date.now() - 900000, tenant: 'default' },
];

app.get('/api/errors', (req, res) => {
  try {
    const limit = Math.max(1, Math.min(500, parseInt(req.query.limit || '100', 10)));
    const tenant = req.headers['x-tenant'];
    const list = tenant ? ERRORS.filter(e => e.tenant === tenant) : ERRORS;
    const sorted = list.sort((a,b)=> (b.timestamp||0) - (a.timestamp||0)).slice(0, limit);
    res.json({ ok: true, errors: sorted });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/api/errors', (req, res) => {
  try {
    const { message, stack, severity, tenant } = req.body || {};
    const item = {
      id: ERRORS.length ? (ERRORS[ERRORS.length - 1].id + 1) : 1,
      message: String(message || 'Error'),
      stack: String(stack || ''),
      severity: String(severity || 'low'),
      timestamp: Date.now(),
      tenant: String(tenant || (req.headers['x-tenant'] || 'default'))
    };
    ERRORS.push(item);
    res.json({ ok: true, error: item });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});
