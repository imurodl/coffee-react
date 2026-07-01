import React, { ReactNode, useEffect, useState } from "react";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";
import MemberService from "../services/MemberService";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null
  );
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  // The auth token is an httpOnly cookie (not readable by JS), so confirm the
  // session with the server instead of inspecting the cookie client-side.
  useEffect(() => {
    const member = new MemberService();
    member.getMemberDetail().then((result) => {
      if (result) {
        setAuthMember(result);
        localStorage.setItem("memberData", JSON.stringify(result));
      } else {
        setAuthMember(null);
        localStorage.removeItem("memberData");
      }
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
