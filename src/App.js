import React, { useEffect } from 'react'
import './App.css';
import NavBar from './components/navbar/navbar';
import DashBoard from './components/dashboard-view/dashBoard';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllData } from './action/data-action';
import Loading from './components/loading view/Loading';
const App = () => {
  const dispatch = useDispatch();
  const { allTickets } = useSelector(state => state.DataReducer);
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch])

  return allTickets ? (
    <div style={{ paddingTop: "15px" }} >
      <NavBar />
      <hr style={{ marginTop: "15px" }} />
      <DashBoard />
    </div>
  ) : <Loading />
}
export default App

