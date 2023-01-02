import { 
  Footer,
  Navbar,
  NavbarUser,
  NavArticles
} from '@/app/components';
import { LocalStorageService } from "@/app/core";
import { useState } from 'react';

export function Home() {
  const [ articles, setArticles ] = useState([]);
  const [ select, setSelect ] = useState('Global Feed');
  const { isLogin } = LocalStorageService();
  const options = [
    { name: 'Your Feed', disabled: false, show: true }, 
    { name: 'Global Feed', disabled: false, show: true }
  ];

  return (
    <>
      {
        isLogin()
          ? <NavbarUser />
          : <Navbar />
      }
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">

              <NavArticles options={options} select={select} setSelect={setSelect} />

            </div>

            {/* <div class="col-md-3">
              <div class="sidebar">
                <p>Popular Tags</p>

                <div class="tag-list">
                  <a href="" class="tag-pill tag-default">programming</a>
                  <a href="" class="tag-pill tag-default">javascript</a>
                  <a href="" class="tag-pill tag-default">emberjs</a>
                  <a href="" class="tag-pill tag-default">angularjs</a>
                  <a href="" class="tag-pill tag-default">react</a>
                  <a href="" class="tag-pill tag-default">mean</a>
                  <a href="" class="tag-pill tag-default">node</a>
                  <a href="" class="tag-pill tag-default">rails</a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}