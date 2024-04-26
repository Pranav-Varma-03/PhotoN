import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import HomePhotoN from './components/Home/PhotoN/HomePhotoN';
import Album from './components/Home/PhotoN/Album';
import Bin from './components/Home/PhotoN/Bin';
import Fav from './components/Home/PhotoN/Fav';
import Lock from './components/Home/PhotoN/Lock';
import Save from './components/Home/PhotoN/Save';
import Share from './components/Home/PhotoN/Share';

import HomeMarketPlace from './components/Home/MarketPlace/HomeMarketPlace';
// import FollowFeed from './components/Home/MarketPlace/FollowFeed';
import PublicFeed from './components/Home/MarketPlace/PublicFeed';
import Uploads from './components/Home/MarketPlace/Uploads';
import PhotoDetails from './components/Home/PhotoN/PhotoView';
import GlobalPhotoDetails from './components/Home/PhotoN/PhotoViewGlobal';
import PhotoDetailsBin from './components/Home/PhotoN/PhotoViewBin';
import PhotoDetailsShare from './components/Home/PhotoN/PhotoViewShare';
import PhotoDetailsLock from './components/Home/PhotoN/PhotoViewLock';
import Signup from './components/Signup';
import AlbumsView from './components/Home/PhotoN/Album/AlbumViews';
import PhotoDetailsAlbum from './components/Home/PhotoN/PhotoViewAlbum';
import GlobalUploadPhotoDetails from './components/Home/MarketPlace/GlobalUploadPhoto';
class App extends Component {

  render() {
    return (
      // <div className="App">
      // <h1>HI</h1>
      // </div>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route index element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Add a route for photo details */}

          <Route element={<ProtectedRoute />}>

          <Route path="/home/photon/*" element={
                    <>
                    <Routes>
                        <Route path="/" element={<HomePhotoN />} />
                        <Route path="/photo-details/:id" element={<PhotoDetails />} />
                        <Route path="/share" element={<Share />} />
                        <Route path="/share/photo-details/:id" element={<PhotoDetailsShare />} />
                        <Route path="/save" element={<Save />} />
                        <Route path="/fav" element={<Fav />} />
                        <Route path="/album" element={<Album />} />
                        <Route path="/album/:id" element={<AlbumsView />} />
                        <Route path="/album/photo-details/:albumId/:photoId" element={<PhotoDetailsAlbum />} />
                        <Route path="/lock" element={<Lock />} />
                        <Route path="/lock/photo-details/:id" element={<PhotoDetailsLock />} />
                        <Route path="/bin" element={<Bin />} />
                        <Route path="/bin/photo-details/:id" element={<PhotoDetailsBin />} />
                    </Routes>
                    </>
                } />
            <Route path='/home/marketplace/*' element={
                  <>
                    <Routes>
                        <Route path="/" element={<HomeMarketPlace/>} />
                        {/* <Route path="/followfeed" element={<FollowFeed />} /> */}
                        <Route path="/publicfeed" element={<PublicFeed/>} />
                        <Route path="/publicfeed/photo-details/:id" element={<GlobalPhotoDetails/>} />
                        <Route path="/uploads" element={<Uploads />} />
                        <Route path="/uploads/:id"  element = {< GlobalUploadPhotoDetails />}/>
                    </Routes>
                    </>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;