import './App.scss';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { addFunction, deleteFunction, favFunction } from './helperfunctions';
import friends from './friends';
import Pagination from './Pagination';
import List from './List';

export default function App() {

  //friend list stored possible to act as a server fetched data
  const [friendListOg, setFriendListOg] = useState(friends);

  //friend list
  const [friendList, setFriendList] = useState([]);

  //current page of pagination
  const [currentPage, setCurrentPage] = useState(0);

  //sort direction
  const [sort, setSort] = useState(false);

  //add friend message show condition
  const [addSuccess, setAddSuccess] = useState(false);

  //state to store validation error while adding friend
  const [friendError, setFriendError] = useState('');

  //delete modal display state
  const [modalShow, setModalShow] = useState(false);

  //temporary holder to store the name of friend to be deleted
  const [deleteHolder, setDeleteHolder] = useState('');

  //any change in orignal friendlist will be reflected on the current displayed friendlist
  useEffect(()=>{
    setFriendList(friendListOg);
  },[friendListOg]);

  //success message hide after 1 sec of being displayed
  useEffect(()=>{
    if(addSuccess) {
      setTimeout(()=> {
        setAddSuccess(false)
      },1000);
    }
  },[addSuccess]);

  //add friend function
  const addItem = (name) => {
    setFriendListOg(addFunction(name, friendListOg));
  }

  //delete friend function
  const deleteItem = (name) => {
    setFriendListOg(deleteFunction(name, friendListOg));
    if(Math.ceil((friendListOg.length-1)/3) < currentPage + 1) {
      setCurrentPage(current => current - 1);
    }
  }

  //favourite a  friend function
  const favItem = (item) => {
    setFriendListOg(favFunction(item, friendListOg));
  }

  return (
    <div className="friend-list-main">
          <div className="friend-list-box">
            <h3>You have {friendListOg.length} friends!</h3>
            <div className="friend-list-box-inner">
              {/* add a friend input */}
            <input id="addfriend" placeholder="Enter your friend's name"
            onChange={(e)=> {
              setAddSuccess(false);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if(e.target.value) {
                if(friendListOg.map(item => item.name.toUpperCase()).includes(e.target.value.toUpperCase())) {
                  setFriendError('Friend is already present in the list');
                }
                else {
                addItem(e.target.value);
                setTimeout(()=>{
                  e.target.value = '';
                }, 10)
                setFriendError('');
                setAddSuccess(true);
                }
              }
              else {
                setFriendError('Please enter name');
              }
              }
            }}
            />
            {friendError && <p className="error">{friendError}</p>}
            {addSuccess && <p className="successalert">Added Successfully!</p>}

            {/* search a friend input */}
            <input id="searchbox" placeholder="Search Friends..." onChange={(e)=>{
              let inputVal = e.target.value;
              setFriendList(friendListOg.filter(item  => item.name.toUpperCase().indexOf(inputVal.toUpperCase()) > -1));
              setCurrentPage(0);
              setSort(false);
            }}/>
            <div className="sortbtn">
            <button className={sort ? "active" : null} onClick={()=> {
              if(sort) {
              setFriendList(list=> list.sort((a,b)=> a.favourite - b.favourite));
              }
              else {
                setFriendList(list=> list.sort((a,b)=> b.favourite - a.favourite));
              }
              setCurrentPage(0);
              setSort(sorted => !sorted);
            }}>Sort by Favourite</button>
            </div>
            {/* Rendered Friend List */}
            <List friendList={friendList} currentPage={currentPage} favItem={favItem} setDeleteHolder={setDeleteHolder} setModalShow={setModalShow}/>
            </div>
            {/* Pagination component with edge case */}
            {
              friendList.length > 3 &&
            <Pagination data={friendList} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            }
            </div>
            <Modal show={modalShow} setModalShow={setModalShow} delete={deleteItem} friendList={friendListOg} name={deleteHolder}/>
    </div>
  );
}
