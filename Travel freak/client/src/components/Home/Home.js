import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid ,Paper, AppBar,Button,TextField} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import  Pagination  from '../Pagination.jsx';
import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useHistory,useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}
const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query =useQuery();
  const history =useHistory();
  const page = query.get('page') || 1;
  const searchQuery= query.get('searchQuery');
  const classes =useStyles();
  const [search, setsearch] = useState('');
  const [tags, settags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost=()=>{
    if(search.trim()){
      //logic
    }
  }
  const handleKeyPress=(e)=>{
    //keycode 13 means -> enter key
        if(e.KeyCode===13){
            //logic
        }
  }

  const handleAdd=(tag)=> settags([...tags,tag])

  const handleDelete=(tagToDelete)=> settags(tags.filter((tag)=> tag!= tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridcontainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position ="static" color="inherit">
                <TextField name ="search" variant="outlined" label ="Search for places"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e)=>{setsearch(e.target.value)}}/>
                <ChipInput
                style={{margin :'10px 0'}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search by tags"
                variant="outlined"
                />
                <button onClick={searchPost} className={classes.searchButton} color="primary">Search</button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper  elevation={6}>
                <Pagination/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
