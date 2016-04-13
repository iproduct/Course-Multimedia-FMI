/* (c) Copyright IPT - Intellectual Products & Technologies Ltd., 2003-2014.
 * All rights reserved. This software program can be compiled and modified only as a part of the 
 * "SOA and Advanced Java Technologies" course provided by IPT - Intellectual Products & Technologies Ltd.,
 * for educational purposes only, and provided that this copyright notice is kept unchanged 
 * with the program. The program is provided "as is", without express or implied warranty of any 
 * kind, including any implied warranty of merchantability, fitness for a particular purpose or 
 * on-infringement. Should the Source Code or any resulting software prove defective, the user
 * assumes the cost of all necessary servicing, repair, or correction. In no event shall 
 * IPT - Intellectual Products & Technologies Ltd. be liable to any party under any legal theory 
 * for direct, indirect, special, incidental, or consequential damages, including lost profits, 
 * business interruption, loss of business information, or any other pecuniary loss, or for
 * personal injuries, arising out of the use of this source code and its documentation, or arising 
 * out of the inability to use any resulting program, even if IPT - Intellectual Products & 
 * Technologies Ltd. has been advised of the possibility of such damage. 
 * Contact information: http://www.iproduct.org, e-mail: office@iproduct.org 
*/

package org.iproduct.polling.representations;

import java.net.URI;
import javax.ws.rs.core.Link;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
//import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author admin
 */
//@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="_link")
public class LinkRepresentation {
    public static final String REL = "rel";
    public static final String TITLE = "title";
    public static final String TYPE = "type";
    
//    @XmlAttribute()
    private URI href;//=URI.create("#");
//    @XmlAttribute
    private String rel;
//    @XmlAttribute
    private String title;
//    @XmlAttribute
    private String type;

    LinkRepresentation(){
    }

    public LinkRepresentation(Link link) {
        this.href = link.getUri();
        this.rel = link.getRel();
        this.title = link.getTitle();
        this.type = link.getType();
    }
    public LinkRepresentation(URI target, String rel) {
        this.href = target;
        this.rel = rel;
    }

    public LinkRepresentation(URI target, String rel, String title) {
        this.href = target;
        this.rel = rel;
        this.title = title;
    }

    public LinkRepresentation(URI target, String rel, String title, String type) {
        this.href = target;
        this.rel = rel;
        this.title = title;
        this.type = type;
    }

    public URI getHref() {
        return href;
    }

    public void setHref(URI target) {
        this.href = target;
    }

    public String getRel() {
        return rel;
    }

    public void setRel(String rel) {
        this.rel = rel;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 97 * hash + (this.href != null ? this.href.hashCode() : 0);
        hash = 97 * hash + (this.rel != null ? this.rel.hashCode() : 0);
        hash = 97 * hash + (this.title != null ? this.title.hashCode() : 0);
        hash = 97 * hash + (this.type != null ? this.type.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final LinkRepresentation other = (LinkRepresentation) obj;
        if (this.href != other.href && (this.href == null || !this.href.equals(other.href))) {
            return false;
        }
        if ((this.rel == null) ? (other.rel != null) : !this.rel.equals(other.rel)) {
            return false;
        }
        if ((this.title == null) ? (other.title != null) : !this.title.equals(other.title)) {
            return false;
        }
        if ((this.type == null) ? (other.type != null) : !this.type.equals(other.type)) {
            return false;
        }
        return true;
    }

  

    @Override
    public String toString() {
        return "Link{" + "target=" + href  + ", rel=" + rel + ", title=" + title 
                + ", type=" + type + '}';
    }
    
}
