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

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

/**
 *
 * @author admin
 */
@XmlRootElement(name = "_links")
@XmlAccessorType(XmlAccessType.FIELD)
public class LinksRepresentation {
    List<LinkRepresentation> links = new ArrayList<LinkRepresentation>();

    public LinksRepresentation() {
    }

    public LinksRepresentation(List<LinkRepresentation> links) {
        this.links = links;
    }

    public List<LinkRepresentation> getLinks() {
        return links;
    }

    public void setLinks(List<LinkRepresentation> links) {
        this.links = links;
    }

    public LinksRepresentation addLink(LinkRepresentation aLink) {
        links.add(aLink);
        return this;
    }
    
    @Override
    public String toString() {
        return "Links" + links;
    }
    
}
