import { Container, styled } from "@mui/material";
import { Suspense, ReactNode } from "react";
import { Outlet } from "react-router-dom";

const PageContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', // Make the container take the full viewport height
});

const AuthLayout = () => {
  return (
    <PageContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </PageContainer>
  );
};

export default AuthLayout;
