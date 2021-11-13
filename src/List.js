function List(props) {
    const { friendList, currentPage, favItem, setDeleteHolder, setModalShow} = props;
  return (
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
  );
}

export default List;