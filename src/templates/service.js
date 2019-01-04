import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

export default function Template({
  // this prop will be injected by the GraphQL query below.
  data,
}) {
  // data.markdownRemark holds our service post data
  const post = data.markdownRemark;
  const postHasCallToAction = post.frontmatter.hideCallToAction === null || post.frontmatter.hideCallToAction !== true;
  const postHasCallToActionText = post.frontmatter.callToActionText !== null;
  return (
    <div>
      <HelmetWrapper title={post.frontmatter.title} description={post.excerpt} />
      <div className="contentdiv">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        {
          postHasCallToAction &&
            (
              postHasCallToActionText ?
              <ContactSnippet source={post.fields.slug} blurb={post.frontmatter.callToActionText} />
              :
              <ContactSnippet source={post.fields.slug} />
            )
        }
      </div>
    </div>
  );
}

 /* eslint no-undef: "off" */
 export const pageQuery = graphql`
 query ServicePage($service: String) {
   service: allMarkdownRemark (
     filter: {
       fields: { isService: { eq: true } }
       frontmatter: { name: { eq: $service } }
     }
   ) {
     edges {
       node {
         html
         frontmatter {
           name
           url
           miniBlurb
         }
         fields {
           internalURL
         }
       }
     }
   }
}`