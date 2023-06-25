import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
type Props = {};

function Faqs({}: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="faqs-container">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
        blanditiis doloremque dolores cupiditate voluptatem optio nostrum ipsam
        numquam dicta saepe iure facere perspiciatis magnam sapiente nisi
        voluptate, earum quibusdam maxime, quis mollitia velit ut minima minus
        dolor. Quae corrupti nostrum deserunt similique vero expedita
        repellendus est, perferendis numquam sunt molestiae.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi perferendis saepe ipsum odio. Culpa distinctio est, molestiae et dolores explicabo enim nihil maiores esse quae neque provident laudantium modi pariatur, eius maxime eaque eligendi? Nam velit consequatur quis sit odio?
      </p>
      <div>
        {user ? (
          <>
            <Link className="faqs-link" to="/profile">
              Visit Profile Page
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Faqs;
