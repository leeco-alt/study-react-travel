import React from 'react'
import { useParams, useLocation, useMatch, useNavigate } from 'react-router-dom'

interface MatchParams {
  touristRouteId: string
}
export const DetailPage: React.FC<any> = (
  // export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (
  props
) => {
  let params = useParams()
  let location = useLocation()
  let match = useMatch(location.pathname)
  let navigate = useNavigate()
  //   console.log(params)
  //   console.log(location)
  //   console.log(match)
  //   console.log(navigate)
  return <h1>旅游路线详情页面，路线ID：{params.touristRouteId}</h1>
}
