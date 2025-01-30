import { Dashboard } from "@mui/icons-material";
import { Icon } from "@mui/material";

export const adminTabs = [{
    name: "Dashboard",
    route: "/admin",
    icon:<Dashboard/>
}, {
    name: "Products",
    route: "/admin/products"

}, {
    name: "Orders",
    route: "/admin/orders"
}, {
    name: "Users",
    route: "/admin/users"
}]