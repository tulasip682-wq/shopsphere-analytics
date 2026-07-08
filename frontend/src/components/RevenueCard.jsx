import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

export default function RevenueCard() {
  const [total, setTotal] = useState(0);

  const loadRevenue = async () => {
    const res = await api.get("/analytics/revenue");
    setTotal(res.data.total || 0);
  };

  useEffect(() => {
    loadRevenue();
    socket.on("newOrder", loadRevenue);
    return () => socket.off("newOrder");
  }, []);

  return <h3>Total Revenue: ₹{total}</h3>;
}
