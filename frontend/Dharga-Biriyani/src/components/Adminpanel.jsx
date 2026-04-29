import { useCallback, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
} from "@mui/material";
import CreateProduct from "./CreateProduct";

const Adminpanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const token = localStorage.getItem("token");

  //Get all orders
  const getOrders = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/orders/admin/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    (async () => {
      getOrders();
    })();
  }, [getOrders]);

  //update Status
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:3000/orders/admin/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ status }),
    });
    getOrders();
  };

  const role = localStorage.getItem("role");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
        return "warning";
      case "On the Way":
        return "info";
      case "Delivered":
        return "success";
      case "Pending":
        return "error";
      default:
        return "default";
    }
  };

  const filteredOrders = selectedFilter
    ? orders.filter((order) => order.status === selectedFilter)
    : orders;

  const totalOrders = orders.length;
  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing",
  ).length;
  const onTheWayOrders = orders.filter(
    (order) => order.status === "On the Way",
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  return (
    <>
      {role === "admin" ? (
        loading ? (
          <Box sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #eef4ff 0%, #ffffff 100%)",
          }}>
            <Box sx={{ textAlign: "center" }}>
              <div className="page-loading-spinner" style={{ margin: "0 auto 16px" }}></div>
              <Typography variant="h6" color="text.secondary">
                Loading dashboard...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fetching orders & products
              </Typography>
            </Box>
          </Box>
        ) : (
        <Box
          sx={{
            width: "100%",
            padding: 2,
            minHeight: "100vh",
            background: "linear-gradient(135deg, #eef4ff 0%, #ffffff 100%)",
          }}
        >
          <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold", letterSpacing: 0.5 }}
            >
              Admin Dashboard
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Manage orders and products with clearer insights, faster updates,
              and a polished dashboard experience.
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                {
                  label: "Total Orders",
                  value: totalOrders,
                  color: "primary",
                },
                {
                  label: "Pending",
                  value: pendingOrders,
                  color: "error",
                },
                {
                  label: "Preparing",
                  value: preparingOrders,
                  color: "warning",
                },
                {
                  label: "On the Way",
                  value: onTheWayOrders,
                  color: "info",
                },
                {
                  label: "Delivered",
                  value: deliveredOrders,
                  color: "success",
                },
              ].map((stat) => (
                <Grid item xs={12} md={6} lg={3} key={stat.label}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      boxShadow: 4,
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{
                          textTransform: "uppercase",
                          mb: 1,
                          letterSpacing: 1,
                        }}
                      >
                        {stat.label}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", color: `${stat.color}.main` }}
                      >
                        {stat.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Card sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "white" }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  centered
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{ px: 2 }}
                >
                  <Tab label="Orders" />
                  <Tab label="Create Product" />
                </Tabs>
              </Box>
            </Card>
            <Box sx={{ mt: 3 }}>
              {activeTab === 0 && (
                <>
                  {/* Filter Buttons */}
                  <Box
                    sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}
                  >
                    <Button
                      variant={
                        selectedFilter === null ? "contained" : "outlined"
                      }
                      onClick={() => setSelectedFilter(null)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      All Orders
                    </Button>
                    <Button
                      variant={
                        selectedFilter === "Pending" ? "contained" : "outlined"
                      }
                      color="error"
                      onClick={() => setSelectedFilter("Pending")}
                      sx={{
                        borderRadius: 2,
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={
                        selectedFilter === "Preparing"
                          ? "contained"
                          : "outlined"
                      }
                      color="warning"
                      onClick={() => setSelectedFilter("Preparing")}
                      sx={{
                        borderRadius: 2,
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      Preparing
                    </Button>
                    <Button
                      variant={
                        selectedFilter === "On the Way"
                          ? "contained"
                          : "outlined"
                      }
                      color="info"
                      onClick={() => setSelectedFilter("On the Way")}
                      sx={{
                        borderRadius: 2,
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      On the Way
                    </Button>
                    <Button
                      variant={
                        selectedFilter === "Delivered"
                          ? "contained"
                          : "outlined"
                      }
                      color="success"
                      onClick={() => setSelectedFilter("Delivered")}
                      sx={{
                        borderRadius: 2,
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      Delivered
                    </Button>
                  </Box>
                  {filteredOrders.length === 0 ? (
                    <Card
                      sx={{
                        p: 4,
                        textAlign: "center",
                        boxShadow: 3,
                        borderRadius: 3,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {selectedFilter
                          ? `No ${selectedFilter} orders yet`
                          : "No orders available yet"}
                      </Typography>
                      <Typography color="text.secondary">
                        {selectedFilter
                          ? "Try selecting a different filter"
                          : "Orders will appear here when customers place them."}
                      </Typography>
                    </Card>
                  ) : (
                    <Grid container spacing={2}>
                      {filteredOrders.map((order) => (
                        <Grid item xs={12} md={6} lg={4} key={order._id}>
                          <Card
                            sx={{
                              height: "100%",
                              boxShadow: 4,
                              borderRadius: 3,
                              border: "1px solid rgba(0,0,0,0.08)",
                            }}
                          >
                            <CardContent sx={{ padding: 3 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 2,
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  color="text.secondary"
                                >
                                  Order #{order._id?.slice(-6)}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {order.createdAt
                                    ? new Date(order.createdAt).toLocaleString()
                                    : ""}
                                </Typography>
                              </Box>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", mb: 1 }}
                              >
                                {order.userId?.name || "Guest"}
                              </Typography>
                              {order.name && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 1 }}
                                >
                                  Name: {order.name}
                                </Typography>
                              )}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                              >
                                Address: {order.address}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                              >
                                Mobile: {order.mobileNumber}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 2, fontWeight: "bold" }}
                              >
                                Total: ₹{order.totalAmount}
                              </Typography>
                              <Box sx={{ mb: 2 }}>
                                <Chip
                                  label={order.status}
                                  color={getStatusColor(order.status)}
                                  variant="outlined"
                                  sx={{ fontWeight: "bold" }}
                                />
                              </Box>
                              <Box
                                sx={{
                                  mt: 2,
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color="warning"
                                  size="small"
                                  onClick={() =>
                                    updateStatus(order._id, "Preparing")
                                  }
                                >
                                  Preparing
                                </Button>
                                <Button
                                  variant="contained"
                                  color="info"
                                  size="small"
                                  onClick={() =>
                                    updateStatus(order._id, "On the Way")
                                  }
                                >
                                  On the Way
                                </Button>
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  onClick={() =>
                                    updateStatus(order._id, "Delivered")
                                  }
                                >
                                  Delivered
                                </Button>
                              </Box>
                              <Typography
                                variant="h6"
                                sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
                              >
                                Products
                              </Typography>
                              {order.products &&
                                order.products.map((item) => (
                                  <Box
                                    key={item._id}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mt: 1,
                                      p: 1,
                                      borderRadius: 1,
                                      backgroundColor: "grey.50",
                                      border: "1px solid",
                                      borderColor: "grey.200",
                                    }}
                                  >
                                    <Avatar
                                      src={`data:image/png;base64,${item.productId?.image}`}
                                      alt="product"
                                      sx={{ width: 56, height: 56, mr: 2 }}
                                    />
                                    <Box>
                                      <Typography
                                        variant="body1"
                                        sx={{ fontWeight: "medium" }}
                                      >
                                        {item.productId?.name}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        Price: ₹{item.productId?.price} | Qty:{" "}
                                        {item.qty}
                                      </Typography>
                                    </Box>
                                  </Box>
                                ))}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </>
              )}
              {activeTab === 1 && <CreateProduct />}
            </Box>
          </Box>
        </Box>
        )) : (
        <Typography variant="h5" align="center" sx={{ mt: 5 }}>
          Access Denied ❌ (ADMIN ONLY)
        </Typography>
      )}
    </>
  );
};

export default Adminpanel;
