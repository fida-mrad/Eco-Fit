import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { ProvideAgent, useAgent } from "../AgentContext";

// routes config
import routes from '../routes'

const AppContent = () => {
  const { agent } = useAgent();

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        {/* <ProvideAgent> */}
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element agent={agent} />}
                />
              )
            )
          })}
          {/* <Route path="/agent" element={<Navigate to="dashboard" replace />} /> */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
        {/* </ProvideAgent> */}
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
