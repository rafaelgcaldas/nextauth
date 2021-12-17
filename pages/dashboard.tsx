import { useContext, useEffect } from "react"
import { Can } from "../component/Can";
import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { useCan } from "../useCan";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  })

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.error(err))
  }, [])
  
  return (
    <>
      <h1>DASHBOARD: {user?.email}</h1>

      {userCanSeeMetrics && <div>Métricas</div>}

      <Can permissions={['metrics.list']}>
        <div>Componente de métricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data)
  
  return {
    props: {}
  }
})