import { AccessControl } from "accesscontrol";

const ac = new AccessControl();
 
export const roles = (
    function() {
        ac.grant("user")
        .readOwn("profile")
        .updateOwn("profile")
        .deleteOwn("profile")

        ac.grant("admin")
        .extend("user")
        .readAny("profile")

        return ac;
})();