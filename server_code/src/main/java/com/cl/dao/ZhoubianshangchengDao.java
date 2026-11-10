package com.cl.dao;

import com.cl.entity.ZhoubianshangchengEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.ZhoubianshangchengView;


/**
 * 周边商城
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:41
 */
public interface ZhoubianshangchengDao extends BaseMapper<ZhoubianshangchengEntity> {
	
	List<ZhoubianshangchengView> selectListView(@Param("ew") Wrapper<ZhoubianshangchengEntity> wrapper);

	List<ZhoubianshangchengView> selectListView(Pagination page,@Param("ew") Wrapper<ZhoubianshangchengEntity> wrapper);
	
	ZhoubianshangchengView selectView(@Param("ew") Wrapper<ZhoubianshangchengEntity> wrapper);


    List<Map<String, Object>> selectValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<ZhoubianshangchengEntity> wrapper);

    List<Map<String, Object>> selectTimeStatValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<ZhoubianshangchengEntity> wrapper);

    List<Map<String, Object>> selectGroup(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<ZhoubianshangchengEntity> wrapper);



}
