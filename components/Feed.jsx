"use client"
import { useState,useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data,handleTagClick})=>{
  return(<div className="mt-16 prompt_layout">
      {data.map((post)=>(<PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>))}
  </div>)
}

const Feed = () => {
 const[searchText,setSearchText] = useState("");
 const[searchTimeout,setSearchTimeout] = useState(null)
 const[posts, setPosts] = useState([]);
 const [searchedResults, setSearchedResults] = useState([]);
 
 useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    
    }
    fetchPosts();
 },[])

 const filterPrompts =(searchText)=>{
  const regex =new RegExp(searchText,"i");
  return posts.filter((item)=> regex.test(item.creator.username)||regex.test(item.tag)||regex.test(item.prompt));
 };

 const handleSearchChange = (e)=>{
  clearTimeout(searchTimeout);
  setSearchText(e.target.value);

  setSearchTimeout(()=>{
    const searchResults = filterPrompts(e.target.value);
    setSearchedResults(searchResults);
  },500)
}

  const handleTagClick = (tagName) =>{
    setSearchText(tagName);
    const searchResults = filterPrompts(tagName);
    setSearchedResults(searchResults);
  } 

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for tag or username"
         value={searchText} onChange={handleSearchChange} required className="search_input peer"/>
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts.reverse()} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed