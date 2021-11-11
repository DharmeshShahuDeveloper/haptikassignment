import './App.scss';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
import Modal from './Modal';

function App() {

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

  const [friendList, setFriendList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const [sort, setSort] = useState(false);

  const [ready, setReady] = useState(true);

  const [friendError, setFriendError] = useState('');

  const [modalShow, setModalShow] = useState(false);
  const [deleteHolder, setDeleteHolder] = useState('');

  useEffect(()=>{
    setFriendList(friendListOg);
  },[friendListOg]);

  useEffect(()=>{
    if(!ready) {
      setReady(true);
    }
  },[ready]);

  const deleteFunction = (name, list) => {
    // setFriendList(list => list.filter(listItem=> listItem.name !== name));
    let tempList = [...list].filter(listItem=> listItem.name !== name);
    setFriendListOg(tempList);
    return tempList;
  }


  return (
    <div className="friend-list-main">
          <div className="friend-list-box">
            <h3>You have {friendListOg.length} friends!</h3>
            <div className="friend-list-box-inner">
            <input id="addfriend" placeholder="Enter your friend's name"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if(e.target.value) {
                if(friendListOg.map(item => item.name.toUpperCase()).includes(e.target.value.toUpperCase())) {
                  setFriendError('Friend is already present in the list');
                }
                else {
                // setFriendList(list=> [...list, {name: e.target.value, favourite: false}]);
                setFriendListOg(list=> [...list, {name: e.target.value, favourite: false}]);
                setTimeout(()=>{
                  e.target.value = '';
                }, 10)
                setFriendError('');
                }
              }
              else {
                setFriendError('Please enter name');
              }
              }
            }}
            />
            {friendError && <p className="error">{friendError}</p>}
            <input id="searchbox" placeholder="Search Friends..." onChange={(e)=>{
              let inputVal = e.target.value;
              // setFriendList(friendListOg.filter(item  => item.name.toUpperCase().indexOf(inputVal) > -1));
              setFriendList(friendListOg.filter(item  => item.name.toUpperCase().indexOf(inputVal.toUpperCase()) > -1));
              setCurrentPage(0);
            }}/>
            <div className="sortbtn">
            <button className={sort ? "active" : null} onClick={()=> {
              if(sort) {
              // setFriendList(list=> list.sort((a,b)=> a.favourite - b.favourite));
              setFriendListOg(list=> list.sort((a,b)=> a.favourite - b.favourite));
              }
              else {
                // setFriendList(list=> list.sort((a,b)=> b.favourite - a.favourite));
                setFriendListOg(list=> list.sort((a,b)=> b.favourite - a.favourite));
              }
              setCurrentPage(0);
              setReady(false);
              setSort(sorted => !sorted);
            }}>Sort by Favourite</button>
            </div>
            <ul className="friend-list-ul">
              {
                ready && friendList.slice(currentPage*3, (currentPage+1)*3).map((item)=>{
                  return (
                    <li>
                      <span>
                        <span>{item.name}</span>
                        <span>is your friend</span>
                        </span>
                    <span><i className={"fa fa-star" + (!item.favourite ? "-o" : '')} aria-hidden="true" onClick={()=> {
                      // setFriendList(list => list.map(listItem => listItem.name === item.name ? {...listItem, favourite: !item.favourite} : listItem));
                      setFriendListOg(list => list.map(listItem => listItem.name === item.name ? {...listItem, favourite: !item.favourite} : listItem));
                    }}/>
                    </span>
                    <span>
                    <i class="fa fa-trash-o" aria-hidden="true" onClick={()=>{
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
            <Modal show={modalShow} setModalShow={setModalShow} delete={deleteFunction} friendList={friendListOg} name={deleteHolder}/>
    </div>
  );
}

export default App;
