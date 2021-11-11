import './App.scss';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { addFunction, deleteFunction, favFunction } from './helperfunctions';

export default function App() {

  //friend list stored possible to act as a server fetched data
  const [friendListOg, setFriendListOg] = useState([
    {
      name: 'Superman',
      favourite: false
    },
    {
      name: 'Ironman',
      favourite: false
    },
    {
      name: 'Spiderman',
      favourite: true
    },
    {
      name: 'Venom',
      favourite: false
    },
    {
      name: 'Thor',
      favourite: true
    },
    {
      name: 'Deadpool',
      favourite: true
    },
    {
      name: 'Doctor Strange',
      favourite: false
    },
    {
      name: 'Odin',
      favourite: true
    },
    {
      name: 'Black Widow',
      favourite: true
    },
    {
      name: 'Captain America',
      favourite: true
    }
  ]);

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
            <ul className="friend-list-ul">
              {
                friendList.slice(currentPage*3, (currentPage+1)*3).map((item)=>{
                  // displayed friendlist
                  return (
                    <li>
                      <span>
                        <span>{item.name}</span>
                        <span>is your friend</span>
                        </span>
                    <span>
                      {/* favourite a friend icon */}
                      <i className={"fa fa-star" + (!item.favourite ? "-o" : '')} aria-hidden="true" 
                      onClick={()=> favItem(item)}/>
                      </span>
                    <span>
                      {/* delete a friend icon */}
                    <i class="fa fa-trash-o" aria-hidden="true" 
                    onClick={()=>{
                      setDeleteHolder(item.name);
                      setModalShow(true);
                    }}/>
                    </span>
                    </li>
                  )
                })
              }
              </ul>
            </div>
            {
              Array.from(Array(Math.ceil(friendList.length/3)).keys()).length > 1
              ? (
                // Pagination Block (using array methods to generate number of pages)
                <div className="pagination">
                <ul>
                {
                Array.from(Array(Math.ceil(friendList.length/3)).keys()).map((item, index) => {
                    return (
                      <li className={currentPage === item ? "active" : null} onClick={()=>{
                        setCurrentPage(item);
                      }}>{item+1}</li>
                    )
                })
                }
                </ul>
              </div>
              )
              : null
            }
            </div>
            <Modal show={modalShow} setModalShow={setModalShow} delete={deleteItem} friendList={friendListOg} name={deleteHolder}/>
    </div>
  );
}
